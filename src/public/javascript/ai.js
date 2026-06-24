'use strict';
/* ═══════════════════════════════════════════════════════════════════
   SmartTour · ai.js
   Modulo Assistente AI:
   - Costruzione system prompt contestuale (dati città JSON)
   - Chiamata diretta all'API Anthropic (sviluppo locale)
   - Chiamata tramite proxy Node.js (produzione)
   - Rendering messaggi con typing indicator
   - Gestione conversazione multi-turn
   - Rate limiting client-side

   SICUREZZA:
   - window.__ST_KEY è usata SOLO con USE_PROXY=false (sviluppo)
   - Con USE_PROXY=true la chiamata va a /api/chat (Node.js)
     che legge process.env.ANTHROPIC_API_KEY — mai esposta al client
   ═══════════════════════════════════════════════════════════════════ */

const AI = (() => {

  /* ── Stato interno ────────────────────────────────────────────── */
  const _limiter  = new Security.RateLimiter(Config.RATE_LIMIT_CALLS, Config.RATE_LIMIT_WINDOW_MS);
  const _history  = [];     // conversazione multi-turn [{role, content}]
  let   _busy     = false;  // lock per evitare richieste parallele

  /* ══ System Prompt ════════════════════════════════════════════════ */

  /**
   * Costruisce il system prompt dinamico usando i dati della città corrente.
   * Il JSON dei POI viene iniettato nel contesto in forma compatta.
   * @returns {string}
   */
  function _buildSystemPrompt() {
    const city = App.State.city;

    const cityCtx = city
      ? `## Destinazione attiva: ${city.nome}, ${city.paese}
Lingua locale: ${city.lingua} | Valuta: ${city.valuta} | Fuso: ${city.fusoOrario}
Descrizione: ${city.descrizioneBreve}

### POI disponibili (dati strutturati):
${JSON.stringify(city.poi.map(p => ({
  id:        p.id,
  nome:      p.nome,
  cat:       p.categoria,
  durata_h:  p.durata,
  desc:      p.descrizione,
  curiosita: p.curiosita,
})), null, 0)}

### Regole per la generazione di itinerari:
- Seleziona ESCLUSIVAMENTE POI dalla lista sopra. Non inventare luoghi.
- Rispetta il vincolo temporale dell'utente. Somma le durate.
- Ordina i luoghi in sequenza logica (stessa area geografica, categorie affini).
- Mostra: nome, categoria, durata, breve motivazione della scelta.
- Includi al termine: numero di luoghi e ore totali.
- Puoi aggiungere 1-2 curiosità per rendere il racconto coinvolgente.`
      : '### Nessuna città selezionata.\nInvita l\'utente a selezionare un continente e una città dal menu in alto prima di richiedere un itinerario.';

    return `Sei SmartTour AI, un assistente turistico esperto, appassionato e preciso. Parli sempre in italiano.

## Il tuo ruolo:
- Creare itinerari personalizzati basati sui Punti di Interesse (POI) forniti.
- Rispondere a domande su storia, arte, gastronomia e cultura delle destinazioni.
- Aiutare l'utente a pianificare la visita rispettando il suo tempo disponibile.
- Condividere curiosità storiche e aneddoti per rendere il viaggio più ricco.

## Stile di risposta:
- Conciso ma coinvolgente. Evita elenchi troppo lunghi.
- Usa emoji con moderazione (1-2 per risposta).
- Tono: esperto ma amichevole, come una guida turistica locale.
- Se l'utente chiede cose fuori dal tuo contesto, ridirigilo educatamente.

${cityCtx}`;
  }

  /* ══ UI Helpers ═══════════════════════════════════════════════════ */

  /**
   * Aggiunge una bolla di messaggio al pannello chat.
   * @param {'user'|'assistant'} role
   * @param {string} text - testo in chiaro (textContent, no XSS)
   * @returns {HTMLElement} il nodo creato
   */
  function _addMessage(role, text) {
    const container = document.getElementById('aiMessages');
    const div = document.createElement('div');
    div.className    = `ai-msg ${role}`;
    div.dataset.role = role;
    div.textContent  = text;   // ← textContent: nessun HTML dall'AI nel DOM
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return div;
  }

  /** Aggiunge la bolla "sta scrivendo…" */
  function _showTyping() {
    const container = document.getElementById('aiMessages');
    const div = document.createElement('div');
    div.className = 'ai-msg assistant typing';
    div.id        = 'stTyping';
    div.setAttribute('aria-label', 'Assistente in elaborazione');
    div.textContent = ' ';
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  function _removeTyping() {
    document.getElementById('stTyping')?.remove();
  }

  /** Aggiorna lo stato del form (loading on/off) */
  function _setLoading(on) {
    _busy = on;
    const btn = document.querySelector('.btn-send');
    const inp = document.getElementById('aiInput');
    if (btn) btn.disabled = on;
    if (inp) inp.disabled = on;
    document.getElementById('aiStatus').textContent = on ? '⏳ Elaborazione…' : '';
    _updateCallsLeft();
  }

  /** Aggiorna il contatore chiamate rimanenti */
  function _updateCallsLeft() {
    const el = document.getElementById('aiCallsLeft');
    if (el) {
      const rem = _limiter.remaining;
      el.textContent = `${rem} richieste disponibili`;
      el.style.color = rem <= 2 ? 'var(--clr-warn)' : '';
    }
  }

  /* ══ Invio messaggio ══════════════════════════════════════════════ */

  /**
   * Punto di ingresso pubblico: invia un messaggio all'assistente.
   * @param {string} userText - testo grezzo dall'input utente
   */
  async function sendMessage(userText) {
    if (_busy) return;
    if (!Config.FEATURES.AI_CHAT) {
      _addMessage('assistant', 'La funzione AI è disabilitata in questa versione.');
      return;
    }

    // Validazione input
    const msg = Security.Validator.string(userText, 500);
    if (!msg) return;

    if (Security.looksLikeInjection(msg)) {
      _addMessage('assistant', '⚠️ Input non valido rilevato. Inserisci una domanda normale.');
      return;
    }

    // Rate limit client-side
    if (!_limiter.canCall()) {
      _addMessage('assistant', `⚠️ Hai raggiunto il limite di ${Config.RATE_LIMIT_CALLS} messaggi al minuto. Attendi qualche secondo.`);
      _updateCallsLeft();
      return;
    }

    _addMessage('user', msg);
    _history.push({ role: 'user', content: msg });
    _showTyping();
    _setLoading(true);

    try {
      const reply = Config.USE_PROXY
        ? await _callProxy()
        : await _callDirect();

      _removeTyping();
      _addMessage('assistant', reply);
      _history.push({ role: 'assistant', content: reply });

    } catch (err) {
      _removeTyping();
      const errMsg = err.message?.slice(0, 200) ?? 'Errore sconosciuto';
      _addMessage('assistant', `⚠️ Errore: ${errMsg}`);
      console.error('[SmartTour AI]', err);
    } finally {
      _setLoading(false);
    }
  }

  /* ══ Chiamata diretta (sviluppo locale) ═══════════════════════════ */

  async function _callDirect() {
    // Recupera la chiave dalla variabile di sessione (mai hardcoded qui)
    const key = (typeof window !== 'undefined' ? window.__ST_KEY : '') ?? '';

    if (!key) {
      return [
        '🔑 Chiave API non configurata.',
        '',
        'Per usare la chat AI in modalità sviluppo locale:',
        '  1. Apri la console del browser (F12)',
        '  2. Digita: window.__ST_KEY = \'sk-ant-api03-...\'',
        '  3. Riprova.',
        '',
        'In produzione, avvia il server Node.js (prossima versione):',
        'la chiave risiederà in process.env.ANTHROPIC_API_KEY sul server.',
      ].join('\n');
    }

    const res = await fetch(Config.AI_DIRECT_ENDPOINT, {
      method:  'POST',
      headers: {
        'Content-Type':                           'application/json',
        'x-api-key':                              key,
        'anthropic-version':                      Config.AI_VERSION,
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model:      Config.AI_MODEL,
        max_tokens: Config.AI_MAX_TOKENS,
        system:     _buildSystemPrompt(),
        messages:   _history,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message ?? `HTTP ${res.status}`);
    }

    const data = await res.json();
    return data.content?.[0]?.text ?? '(risposta vuota)';
  }

  /* ══ Chiamata tramite proxy Node.js (produzione) ══════════════════ */

  async function _callProxy() {
    /* Il server Node.js (Express) esporrà:
       POST /api/chat
       Body: { system: string, messages: [{role, content}], model, max_tokens }
       Il server legge la chiave da process.env.ANTHROPIC_API_KEY
       Restituisce la risposta standard di Anthropic.
       Il client non vede mai la chiave. */
    const res = await fetch(Config.API_PROXY_ENDPOINT, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system:     _buildSystemPrompt(),
        messages:   _history,
        model:      Config.AI_MODEL,
        max_tokens: Config.AI_MAX_TOKENS,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message ?? err.message ?? `Proxy error HTTP ${res.status}`);
    }

    const data = await res.json();
    // La risposta da Anthropic ha il formato: {content: [{type, text}], ...}
    return data.content?.[0]?.text ?? '(risposta vuota)';
  }

  /* ══ Reset conversazione ══════════════════════════════════════════ */

  function resetChat() {
    _history.length = 0;
    const container = document.getElementById('aiMessages');
    if (!container) return;
    container.innerHTML = '';
    _addMessage('assistant', '🔄 Conversazione resettata. Come posso aiutarti?');
    _updateCallsLeft();
  }

  /* ══ API pubblica ════════════════════════════════════════════════ */
  return Object.freeze({ sendMessage, resetChat, updateCallsLeft: _updateCallsLeft });

})();