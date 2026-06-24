'use strict';
/* ═══════════════════════════════════════════════════════════════════
   SmartTour · config.js
   Configurazione centralizzata dell'applicazione.
   Questo file è l'UNICO punto di configurazione — nessun magic number
   sparso nel codice.

   SICUREZZA:
   - Le API key NON sono qui. Vedi sezione AI_KEY sotto.
   - Con Node.js attivo (USE_PROXY: true) la chiave vive in
     process.env.ANTHROPIC_API_KEY sul server — mai esposta al client.
   ═══════════════════════════════════════════════════════════════════ */

const Config = Object.freeze({

  /* ── Metadati ─────────────────────────────────────────────────── */
  APP_NAME:    'SmartTour',
  VERSION:     '0.1.0-alpha',
  BUILD_DATE:  '2026-06',

  /* ── Endpoints ────────────────────────────────────────────────── */
  // USE_PROXY: false  → sviluppo locale (chiave in window.__ST_KEY)
  // USE_PROXY: true   → produzione con Node.js proxy (raccomandato)
  USE_PROXY:           true,  // ← ATTIVATO: usa Node.js proxy per sicurezza API
  API_PROXY_ENDPOINT:  '/api/chat',
  AI_DIRECT_ENDPOINT:  'https://api.anthropic.com/v1/messages',

  // Modello AI — Sonnet per il giusto bilanciamento velocità/qualità
  AI_MODEL:      'claude-3-5-sonnet-20241022',
  AI_MAX_TOKENS: 1024,
  AI_VERSION:    '2024-06-01',

  /* ── NOTA CHIAVE API ──────────────────────────────────────────────
     NON inserire API key in questo file.
     - Sviluppo locale:  aprire la console del browser e digitare:
         window.__ST_KEY = 'sk-ant-api...'
       Viene usato solo se USE_PROXY = false.
     - Produzione:       Node.js legge process.env.ANTHROPIC_API_KEY.
       Il client non vede mai la chiave.
  ─────────────────────────────────────────────────────────────────── */

  /* ── Dati ─────────────────────────────────────────────────────── */
  DATA_PATH: './data/data.json',  // nuovo file generato da build-data.js

  /* ── Rate limiting client-side ────────────────────────────────── */
  // Ulteriore protezione oltre al limite server-side che Node.js gestirà
  RATE_LIMIT_CALLS:     8,     // max chiamate AI
  RATE_LIMIT_WINDOW_MS: 60000, // finestra temporale (1 minuto)

  /* ── Itinerario ───────────────────────────────────────────────── */
  DEFAULT_HOURS: 3,
  MAX_HOURS:     24,
  MIN_HOURS:     0.5,

  /* ── UI ───────────────────────────────────────────────────────── */
  TOAST_DURATION_MS: 3000,

  /* ── Feature flags ────────────────────────────────────────────── */
  // Permettono di accendere/spegnere funzionalità senza toccare il codice
  FEATURES: Object.freeze({
    AI_CHAT:        true,
    TRIVIA_MODAL:   true,
    GEOLOCATION:    false,  // simulata nel PoC — attivare in V2
    DARK_MODE:      false,  // richiede Node.js per la sessione server-side
    OFFLINE_SAVE:   false,  // richiede Node.js + IndexedDB in V2
    ROUTE_SHARE:    false,  // richiede Node.js per URL permanenti
  }),

  /* ── Categorie POI ────────────────────────────────────────────── */
  CATEGORIES: Object.freeze([
    { id: 'all',          label: 'Tutte',         icon: '🗺' },
    { id: 'Storia',       label: 'Storia',         icon: '🏛' },
    { id: 'Arte',         label: 'Arte',           icon: '🎨' },
    { id: 'Architettura', label: 'Architettura',   icon: '🏗' },
    { id: 'Museo',        label: 'Museo',          icon: '🖼' },
    { id: 'Natura',       label: 'Natura',         icon: '🌿' },
    { id: 'Gastronomia',  label: 'Gastronomia',    icon: '🍽' },
    { id: 'Cultura',      label: 'Cultura',        icon: '🎭' },
  ]),

});