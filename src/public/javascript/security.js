'use strict';
/* ═══════════════════════════════════════════════════════════════════
   SmartTour · security.js
   Modulo di sicurezza client-side.

   Funzioni:
   - sanitize()    → prevenzione XSS su contenuto testuale
   - RateLimiter   → blocca eccesso di chiamate API
   - Validator     → validazione e normalizzazione input
   - Obfuscate     → codifica leggera di dati sensibili in-memory
                     (NON è crittografia: solo offuscamento)

   NOTA: questo modulo protegge dal lato client. La sicurezza vera
   risiede nel server Node.js (prossima versione):
   - API key mai nel client
   - CORS configurato
   - Rate limiting server-side con express-rate-limit
   - Helmet.js per HTTP security headers
   - Input validation con Joi/Zod
   ═══════════════════════════════════════════════════════════════════ */

const Security = (() => {

  /* ── Sanitize ──────────────────────────────────────────────────────
     Converte caratteri HTML speciali per prevenire XSS.
     USA SEMPRE questa funzione prima di inserire testo utente nel DOM.
     Usa textContent dove possibile — sanitize come fallback per innerHTML.
  ─────────────────────────────────────────────────────────────────── */
  function sanitize(raw) {
    if (raw === null || raw === undefined) return '';
    if (typeof raw !== 'string') raw = String(raw);
    // Escape dei caratteri pericolosi usando un nodo temporaneo
    const node = document.createElement('span');
    node.textContent = raw;
    return node.innerHTML;
  }

  /* ── Rate Limiter ──────────────────────────────────────────────────
     Implementazione sliding window per limitare le chiamate API.
     Usa campi privati ES2022 (#) per impedire manomissione dall'esterno.
  ─────────────────────────────────────────────────────────────────── */
  class RateLimiter {
    #maxCalls;
    #windowMs;
    #timestamps = [];

    constructor(maxCalls, windowMs) {
      if (typeof maxCalls !== 'number' || maxCalls < 1) throw new RangeError('maxCalls deve essere >= 1');
      if (typeof windowMs !== 'number' || windowMs < 100) throw new RangeError('windowMs deve essere >= 100ms');
      this.#maxCalls  = maxCalls;
      this.#windowMs  = windowMs;
    }

    /** @returns {boolean} true se la chiamata è permessa */
    canCall() {
      const now = Date.now();
      this.#timestamps = this.#timestamps.filter(t => now - t < this.#windowMs);
      if (this.#timestamps.length >= this.#maxCalls) return false;
      this.#timestamps.push(now);
      return true;
    }

    /** @returns {number} quante chiamate restano nella finestra corrente */
    get remaining() {
      const now = Date.now();
      const active = this.#timestamps.filter(t => now - t < this.#windowMs).length;
      return Math.max(0, this.#maxCalls - active);
    }

    /** Resetta manualmente il contatore (es. dopo login) */
    reset() { this.#timestamps = []; }
  }

  /* ── Validator ─────────────────────────────────────────────────────
     Valida e normalizza input prima dell'uso.
  ─────────────────────────────────────────────────────────────────── */
  const Validator = Object.freeze({
    /**
     * Valida un numero in un range.
     * @param {*}      val  - valore da validare
     * @param {number} min  - minimo incluso
     * @param {number} max  - massimo incluso
     * @returns {number|null}
     */
    number(val, min, max) {
      const n = parseFloat(val);
      if (isNaN(n) || !isFinite(n)) return null;
      if (n < min || n > max) return null;
      return n;
    },

    /**
     * Valida e tronca una stringa.
     * @param {*}      val    - valore da validare
     * @param {number} maxLen - lunghezza massima (default 500)
     * @returns {string|null}
     */
    string(val, maxLen = 500) {
      if (typeof val !== 'string' && typeof val !== 'number') return null;
      const s = String(val).trim();
      if (s.length === 0) return null;
      return s.slice(0, maxLen);
    },

    /**
     * Verifica che un ID sia un identificatore sicuro (alfanumerico + _-).
     * Previene path traversal o injection nei fetch.
     * @param {*} val
     * @returns {string|null}
     */
    identifier(val) {
      if (typeof val !== 'string') return null;
      if (!/^[a-zA-Z0-9_\-]{1,64}$/.test(val)) return null;
      return val;
    }
  });

  /* ── Obfuscate ─────────────────────────────────────────────────────
     Codifica leggera XOR per dati sensibili in memoria.
     NON è crittografia — impedisce solo la lettura a colpo d'occhio.
     Con Node.js, i dati davvero sensibili (API key) non escono mai
     dal server: questa funzione diventa superflua per le chiavi.
  ─────────────────────────────────────────────────────────────────── */
  const Obfuscate = Object.freeze({
    _KEY: [0x5A, 0x3F, 0x71, 0x2C, 0x8E, 0x14, 0xA9],

    /**
     * Codifica una stringa con XOR rotating key + base64.
     * @param {string} str
     * @returns {string}
     */
    encode(str) {
      if (typeof str !== 'string') return '';
      const bytes = new TextEncoder().encode(str);
      const xored = bytes.map((b, i) => b ^ this._KEY[i % this._KEY.length]);
      return btoa(String.fromCharCode(...xored));
    },

    /**
     * Decodifica una stringa codificata con encode().
     * @param {string} enc
     * @returns {string}
     */
    decode(enc) {
      try {
        const raw   = atob(enc);
        const bytes = new Uint8Array(raw.length);
        for (let i = 0; i < raw.length; i++) {
          bytes[i] = raw.charCodeAt(i) ^ this._KEY[i % this._KEY.length];
        }
        return new TextDecoder().decode(bytes);
      } catch {
        return '';
      }
    }
  });

  /* ── Rilevamento tentativo di injection ────────────────────────────
     Semplice check euristico sull'input utente.
     Non è un WAF — è solo un primo filtro client-side.
  ─────────────────────────────────────────────────────────────────── */
  function looksLikeInjection(str) {
    if (typeof str !== 'string') return false;
    const patterns = [
      /<script[\s>]/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /data:text\/html/i,
      /vbscript:/i,
    ];
    return patterns.some(p => p.test(str));
  }

  /* ── Espone solo ciò che serve ─────────────────────────────────── */
  return Object.freeze({ sanitize, RateLimiter, Validator, Obfuscate, looksLikeInjection });

})();