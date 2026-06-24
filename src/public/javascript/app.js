'use strict';
/* ═══════════════════════════════════════════════════════════════════
   SmartTour · app.js
   Logica core dell'applicazione:
   - Caricamento database JSON
   - Stato globale (immutabile via getter)
   - Render griglia POI
   - Filtro per categoria
   - Algoritmo generazione itinerario (greedy)
   - Modal curiosità
   - Toast notifiche
   - Info città
   ═══════════════════════════════════════════════════════════════════ */

const App = (() => {

  /* ══ Stato interno ════════════════════════════════════════════════ */
  const _state = {
    db:           null,   // intero cities.json
    continent:    null,   // continente selezionato
    city:         null,   // città selezionata
    visiblePOIs:  [],     // POI attualmente mostrati
    activeFilter: 'all',  // filtro categoria corrente
    routeActive:  false,  // se è attivo un itinerario generato
    isLoading:    false,
    searchTerm:   '',     // termine di ricerca corrente
    basePool:     [],     // pool di partenza per la ricerca
  };

  /* ── Getter read-only dello stato (i moduli esterni non mutano state) */
  const State = {
    get db()          { return _state.db; },
    get continent()   { return _state.continent; },
    get city()        { return _state.city; },
    get visiblePOIs() { return [..._state.visiblePOIs]; },
    get activeFilter(){ return _state.activeFilter; },
    get routeActive() { return _state.routeActive; },
    get isLoading()   { return _state.isLoading; },
  };

  /* ══ Mapping icone categoria ══════════════════════════════════════ */
  const CAT_ICONS = Object.freeze({
    Storia:       '🏛',
    Arte:         '🎨',
    Architettura: '🏗',
    Museo:        '🖼',
    Natura:       '🌿',
    Gastronomia:  '🍽',
    Cultura:      '🎭',
  });

  /* ══ Database ═════════════════════════════════════════════════════ */

  /**
   * Carica il file JSON delle città.
   * @returns {Promise<void>}
   */
  async function loadDatabase() {
    _state.isLoading = true;
    try {
      const res = await fetch(Config.DATA_PATH);
      if (!res.ok) throw new Error(`HTTP ${res.status} — impossibile caricare ${Config.DATA_PATH}`);
      const raw = await res.json();
      // Validazione struttura minima
      if (!raw.continenti || !Array.isArray(raw.continenti)) {
        throw new Error('Formato JSON non valido: campo "continenti" mancante.');
      }
      _state.db = raw;
      _populateContinentSelect();
      showToast(`Database caricato — ${_countTotals()}`, 'ok');
    } catch (err) {
      console.error('[SmartTour] loadDatabase:', err);
      showToast('Errore caricamento dati: ' + err.message, 'warn');
    } finally {
      _state.isLoading = false;
    }
  }

  /** Conta totali per il toast di avvio */
  function _countTotals() {
    const c = _state.db.continenti.reduce((acc, cont) => {
      acc.cities += cont.stati.reduce((sum, stato) => sum + stato.citta.length, 0);
      acc.poi += cont.stati.reduce((sum, stato) => 
        sum + stato.citta.reduce((s, city) => s + city.poi.length, 0), 0);
      return acc;
    }, { cities: 0, poi: 0 });
    return `${c.cities} città · ${c.poi} POI`;
  }

  /* ══ Selettori UI ═════════════════════════════════════════════════ */

  /** Popola il <select> dei continenti dal database */
  function _populateContinentSelect() {
    const sel = document.getElementById('continentSelect');
    _state.db.continenti.forEach(cont => {
      const opt = document.createElement('option');
      opt.value       = Security.Validator.identifier(cont.id) ?? '';
      opt.textContent = cont.nome;
      sel.appendChild(opt);
    });
  }

  /**
   * Carica gli stati di un continente nel <select> degli stati.
   * @param {string} continentId
   */
  function loadContinent(continentId) {
    const id = Security.Validator.identifier(continentId);
    if (!id) return;
    _state.continent = _state.db?.continenti.find(c => c.id === id) ?? null;

    const selCountry = document.getElementById('countrySelect');
    const selCity = document.getElementById('citySelect');
    
    selCountry.innerHTML = '<option value="">🏳️ Stato…</option>';
    selCity.innerHTML = '<option value="">🏙️ Città…</option>';

    if (!_state.continent) {
      selCountry.disabled = true;
      selCity.disabled = true;
      return;
    }

    _state.continent.stati.forEach(stato => {
      const opt = document.createElement('option');
      opt.value       = Security.Validator.identifier(stato.id) ?? '';
      opt.textContent = stato.nome;
      selCountry.appendChild(opt);
    });
    selCountry.disabled = false;
    selCity.disabled = true;
  }

  /**
   * Carica le città di uno stato nel <select> delle città.
   * @param {string} countryId
   */
  function loadCountry(countryId) {
    const id = Security.Validator.identifier(countryId);
    if (!id || !_state.continent) return;

    const stato = _state.continent.stati.find(s => s.id === id);
    const sel = document.getElementById('citySelect');
    sel.innerHTML = '<option value="">🏙️ Città…</option>';

    if (!stato) {
      sel.disabled = true;
      return;
    }

    stato.citta.forEach(city => {
      const opt = document.createElement('option');
      opt.value       = Security.Validator.identifier(city.id) ?? '';
      opt.textContent = city.nome;
      sel.appendChild(opt);
    });
    sel.disabled = false;
  }

  /**
   * Carica e visualizza una città.
   * @param {string} cityId
   */
  function loadCity(cityId) {
    const id = Security.Validator.identifier(cityId);
    if (!id || !_state.continent) return;

    // Cerca la città negli stati del continente
    let city = null;
    for (const stato of _state.continent.stati) {
      city = stato.citta.find(c => c.id === id);
      if (city) break;
    }
    
    _state.city         = city ?? null;
    _state.activeFilter = 'all';
    _state.routeActive  = false;
    _state.searchTerm   = '';
    _state.basePool     = _state.city?.poi ?? [];

    if (!_state.city) return;

    const categoryFilter = document.getElementById('categoryFilter');
    const timeInput = document.getElementById('timeInput');
    if (categoryFilter) categoryFilter.value = 'all';
    if (timeInput) timeInput.value = Config.DEFAULT_HOURS;

    _renderCityInfo();
    _setVisible(_state.city.poi);
    renderPOIs(_state.visiblePOIs);
  }

  /* ══ Info città ═══════════════════════════════════════════════════ */

  function _renderCityInfo() {
    const c       = _state.city;
    const section = document.getElementById('cityInfo') || document.getElementById('cityHeader');
    if (section) section.hidden = false;

    // Uso textContent per sicurezza — dati interni ma good practice
    document.getElementById('cityName').textContent = `${c.nome}, ${c.paese}`;
    document.getElementById('cityDesc').textContent = c.descrizioneBreve;

    const meta = document.getElementById('cityMeta');
    meta.innerHTML = '';
    [
      { icon: '🗣', val: c.lingua },
      { icon: '💱', val: c.valuta },
      { icon: '🕐', val: c.fusoOrario },
    ].forEach(({ icon, val }) => {
      const li = document.createElement('li');
      li.textContent = `${icon} ${val}`;
      meta.appendChild(li);
    });
  }

  /* ══ Render POI ═══════════════════════════════════════════════════ */

  /** Imposta visiblePOIs e aggiorna il contatore */
  function _setVisible(pois) {
    _state.visiblePOIs = Array.isArray(pois) ? pois : [];
    _updateCount();
  }

  function _matchesSearch(poi, query) {
    if (!query) return true;
    const haystack = [poi.nome, poi.categoria, poi.descrizione, poi.citta || '']
      .join(' ')
      .toLowerCase();
    return haystack.includes(query);
  }

  function searchPOIs(term) {
    if (!_state.city) return;
    const query = String(term ?? '').trim().toLowerCase();
    _state.searchTerm = query;

    const source = Array.isArray(_state.basePool) && _state.basePool.length
      ? _state.basePool
      : _state.city.poi;

    const filtered = query
      ? source.filter(poi => _matchesSearch(poi, query))
      : [...source];

    _setVisible(filtered);
    renderPOIs(filtered);
  }

  function _updateCount(label) {
    const n   = _state.visiblePOIs.length;
    const el  = document.getElementById('poiCount');
    if (label) {
      el.textContent = label;
    } else {
      el.textContent = n > 0 ? `${n} luog${n === 1 ? 'o' : 'hi'}` : '';
    }
  }

  /**
   * Renderizza la griglia POI.
   * @param {Array} pois
   */
  function renderPOIs(pois) {
    const grid  = document.getElementById('poiGrid');
    const empty = document.getElementById('emptyState');

    grid.innerHTML = '';

    if (!pois || pois.length === 0) {
      const msg = _state.city
        ? 'Nessun punto trovato con questi criteri.'
        : 'Seleziona un continente e una città per esplorare i punti di interesse.';
      empty.querySelector('p').textContent = msg;
      empty.hidden = false;
      grid.appendChild(empty);
      return;
    }

    empty.hidden = true;
    const frag = document.createDocumentFragment();
    pois.forEach(poi => frag.appendChild(_buildCard(poi)));
    grid.appendChild(frag);
  }

  /** Costruisce una singola card POI (nessun innerHTML con dati utente) */
  function _buildCard(poi) {
    const article = document.createElement('article');
    article.className = 'poi-card';
    article.setAttribute('role', 'listitem');
    article.setAttribute('data-id', poi.id);
    article.setAttribute('data-categoria', poi.categoria);

    // Header
    const header = document.createElement('div');
    header.className = 'poi-card-header';

    const iconEl = document.createElement('span');
    iconEl.className    = 'poi-icon';
    iconEl.textContent  = CAT_ICONS[poi.categoria] ?? '📍';
    iconEl.setAttribute('aria-hidden', 'true');

    const infoDiv = document.createElement('div');

    const nameEl = document.createElement('h4');
    nameEl.className   = 'poi-name';
    nameEl.textContent = poi.nome;

    const catEl = document.createElement('span');
    catEl.className    = 'poi-category';
    catEl.textContent  = poi.categoria;
    catEl.setAttribute('data-cat', poi.categoria);

    infoDiv.append(nameEl, catEl);

    const timeEl = document.createElement('span');
    timeEl.className   = 'poi-time';
    timeEl.textContent = `⏱ ${poi.durata}h`;
    timeEl.setAttribute('aria-label', `Durata visita: ${poi.durata} ore`);

    header.append(iconEl, infoDiv, timeEl);

    // Descrizione
    const descEl = document.createElement('p');
    descEl.className   = 'poi-desc';
    descEl.textContent = poi.descrizione;

    // Bottone curiosità
    const triviaBtn = document.createElement('button');
    triviaBtn.className   = 'btn-trivia';
    triviaBtn.textContent = '💡 Curiosità';
    triviaBtn.setAttribute('aria-label', `Curiosità su ${poi.nome}`);
    triviaBtn.addEventListener('click', () => showTrivia(poi));

    article.append(header, descEl, triviaBtn);
    return article;
  }

  /* ══ Filtro ═══════════════════════════════════════════════════════ */

  /**
   * Filtra la griglia POI per categoria.
   * @param {string} category - id categoria o 'all'
   */
  function filterPOI(category) {
    if (!_state.city) return;
    _state.activeFilter = category;
    _state.routeActive  = false;

    const base = category === 'all'
      ? _state.city.poi
      : _state.city.poi.filter(p => p.categoria === category);

    _state.basePool = base;
    const query = _state.searchTerm.trim().toLowerCase();
    const filtered = query
      ? base.filter(poi => _matchesSearch(poi, query))
      : base;

    _setVisible(filtered);
    renderPOIs(filtered);
  }

  /* ══ Generazione itinerario ═══════════════════════════════════════ */

  /**
   * Algoritmo greedy per la selezione dei POI.
   * Ordina per durata crescente per massimizzare il numero di luoghi.
   * @param {*} maxHoursRaw - ore inserite dall'utente
   */
  function generateRoute(maxHoursRaw) {
    if (!_state.city) {
      showToast('Seleziona prima una città.', 'warn');
      return;
    }

    const maxH = Security.Validator.number(maxHoursRaw, Config.MIN_HOURS, Config.MAX_HOURS);
    if (maxH === null) {
      showToast(`Ore non valide. Inserisci un valore tra ${Config.MIN_HOURS} e ${Config.MAX_HOURS}.`, 'warn');
      return;
    }

    // Pool: rispetta il filtro categoria attivo
    const pool = (_state.activeFilter === 'all'
      ? [..._state.city.poi]
      : _state.city.poi.filter(p => p.categoria === _state.activeFilter)
    ).sort((a, b) => a.durata - b.durata); // greedy: priorità ai più veloci

    let accum = 0;
    const route = [];
    for (const poi of pool) {
      if (accum + poi.durata <= maxH) {
        route.push(poi);
        accum += poi.durata;
      }
    }

    // Marca le card nell'itinerario
    _state.routeActive = true;
    _state.basePool = route;
    const query = _state.searchTerm.trim().toLowerCase();
    const filteredRoute = query
      ? route.filter(poi => _matchesSearch(poi, query))
      : route;
    _setVisible(filteredRoute);
    renderPOIs(filteredRoute);

    // Aggiunge classe visiva in-route (dopo il render)
    document.querySelectorAll('.poi-card').forEach(card => {
      card.classList.add('in-route');
    });

    if (route.length > 0) {
      _updateCount(`Itinerario: ${route.length} luoghi — ${accum}h totali`);
      showToast(`Itinerario generato: ${route.length} luoghi in ${accum}h`, 'ok');
    } else {
      _updateCount('Nessun luogo compatibile con il tempo inserito.');
      showToast('Nessun luogo compatibile. Prova ad aumentare le ore.', 'warn');
    }
  }

  /* ══ Modal Curiosità ═════════════════════════════════════════════ */

  /**
   * Apre il modal con la curiosità storica di un POI.
   * @param {object} poi
   */
  function showTrivia(poi) {
    if (!Config.FEATURES.TRIVIA_MODAL) return;
    const modal    = document.getElementById('triviaModal');
    const titleEl  = document.getElementById('triviaTitle');
    const textEl   = document.getElementById('triviaText');

    titleEl.textContent = `💡 ${poi.nome}`;
    textEl.textContent  = poi.curiosita;   // textContent, no XSS

    modal.hidden = false;
    modal.focus();
    document.body.style.overflow = 'hidden';
  }

  /** Chiude il modal */
  function closeTrivia() {
    const modal = document.getElementById('triviaModal');
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  /* ══ Toast ════════════════════════════════════════════════════════ */

  /**
   * Mostra una notifica temporanea.
   * @param {string} msg
   * @param {'ok'|'warn'|'info'} type
   */
  function showToast(msg, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className   = `toast ${type}`;
    toast.textContent = msg;                // textContent — nessun XSS
    toast.setAttribute('role', 'alert');
    container.appendChild(toast);
    setTimeout(() => toast.remove(), Config.TOAST_DURATION_MS + 500);
  }

  /* ══ Reset ════════════════════════════════════════════════════════ */

  /** Azzera filtri e mostra tutti i POI della città corrente */
  function reset() {
    if (!_state.city) return;
    _state.activeFilter = 'all';
    _state.routeActive  = false;
    _state.searchTerm   = '';
    _state.basePool     = _state.city.poi;
    const categoryFilter = document.getElementById('categoryFilter');
    const timeInput = document.getElementById('timeInput');
    if (categoryFilter) categoryFilter.value = 'all';
    if (timeInput) timeInput.value = Config.DEFAULT_HOURS;
    _setVisible(_state.city.poi);
    renderPOIs(_state.visiblePOIs);
  }

  /* ══ Viaggi in Offerta ═════════════════════════════════════════════ */
  
  /** Mostra i viaggi in offerta (seleziona città casuali da visualizzare) */
  function showFeaturedTrips() {
    const grid = document.getElementById('featuredTripsGrid');
    grid.innerHTML = '';

    if (!_state.db || !_state.db.continenti) return;

    // Seleziona 6 città casuali da tutto il database
    const allCities = [];
    _state.db.continenti.forEach(cont => {
      cont.stati.forEach(stato => {
        stato.citta.forEach(city => {
          allCities.push({ ...city, continente: cont.nome, stato: stato.nome });
        });
      });
    });

    // Shuffle e prendi i primi 6
    const featured = allCities
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(6, allCities.length));

    const frag = document.createDocumentFragment();
    featured.forEach(city => {
      const card = document.createElement('div');
      card.className = 'featured-trip-card';
      card.role = 'listitem';
      
      const poiCount = city.poi ? city.poi.length : 0;
      const icon = city.poi && city.poi.length > 0 ? CAT_ICONS[city.poi[0].categoria] || '📍' : '🏙️';
      
      card.innerHTML = `
        <div class="featured-trip-img">${icon}</div>
        <div class="featured-trip-info">
          <h3>${Security.Validator.string(city.nome, 100) || 'Città'}</h3>
          <p class="featured-trip-meta">${Security.Validator.string(city.stato, 100) || ''}</p>
          <p class="featured-trip-count">${poiCount} punti di interesse</p>
        </div>
      `;
      
      card.addEventListener('click', () => {
        // Seleziona continente, stato e città dai select
        document.getElementById('continentSelect').value = (city.continente?.toLowerCase().replace(/\s+/g, '_')) || '';
        App.loadContinent(document.getElementById('continentSelect').value);
        
        setTimeout(() => {
          document.getElementById('countrySelect').value = (city.stato?.toLowerCase().replace(/\s+/g, '_')) || '';
          App.loadCountry(document.getElementById('countrySelect').value);
          
          setTimeout(() => {
            document.getElementById('citySelect').value = city.id || '';
            App.loadCity(document.getElementById('citySelect').value);
          }, 100);
        }, 100);
      });
      
      frag.appendChild(card);
    });

    grid.appendChild(frag);
  }

  /* ══ API pubblica ════════════════════════════════════════════════ */
  return Object.freeze({
    State,
    loadDatabase,
    loadContinent,
    loadCountry,
    loadCity,
    renderPOIs,
    filterPOI,
    searchPOIs,
    generateRoute,
    showTrivia,
    closeTrivia,
    showToast,
    reset,
    showFeaturedTrips,
  });

})();