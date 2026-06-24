# SmartTour — Guida Turistica Interattiva

Applicazione web interattiva per esplorare città e punti di interesse in tutto il mondo, con assistente AI integrato powered by Claude.

**Funzionalità:**
- 🗺️ Menu ad albero continenti → stati → città
- ✈️ Pagina "Viaggia con Noi" con offerte di viaggio scontate
- 🔑 Login/Registrazione (localStorage)
- 💳 Codici sconto e offerte categoriali
- 🤖 Assistente AI Claude integrato
- 📱 Design completamente responsive
- 🎨 Interfaccia moderna navy/oro

---

## 🚀 Setup Rapido

### 1. Installa dipendenze
```bash
cd src
npm install
```

### 2. Configura la chiave API di Anthropic
Copia `.env.example` in `.env`:
```bash
cp .env.example .env
```

Modifica `.env` e aggiungi la tua chiave API di Anthropic:
```
ANTHROPIC_API_KEY=sk-ant-v0c...
```

Ottieni la chiave da: https://console.anthropic.com/

### 3. Genera il database dati
```bash
node build-data.js
```

Questo scansiona i file JSON nei continenti e genera `public/data/data.json`

### 4. Avvia il server
```bash
npm start
```

Il server è disponibile su: http://localhost:3000

---

## 📚 Struttura Progetto

```
src/
├── server.js              # Express server + proxy API
├── build-data.js          # Script per generare data.json
├── package.json
├── .env                   # Config locale (NON committare!)
├── public/
│   ├── css/               # Stili
│   │   ├── style.css
│   │   ├── components.css
│   │   ├── featured-trips.css
│   │   ├── travel-page.css       # Stili pagina "Viaggia con Noi"
│   │   └── responsive.css
│   ├── javascript/        # Logica frontend
│   │   ├── app.js         # Core dell'app (menu ad albero, POI)
│   │   ├── travel-page.js # Logica pagina viaggio (filtri, login, offerte)
│   │   ├── ai.js          # Assistente AI con proxy sicuro
│   │   ├── config.js      # Configurazione centralizzata
│   │   ├── main.js        # Inizializzazione e event binding
│   │   └── security.js    # Validazione e sanitizzazione
│   ├── data/
│   │   ├── travel-offers.js  # Dati offerte viaggio e sconti
│   │   └── json stati/       # File JSON per continenti
│   └── images/               # Immagini
│       ├── destinations/     # Immagini città
│       └── README.md         # Istruzioni immagini
└── views/
    ├── index.html         # Homepage
    └── viaggi-in-offerta.html  # Pagina "Viaggia con Noi"
```

---

## 🎯 Funzionalità Principali

### 1. Homepage — Esplora Città
- **Menu ad Albero**: Continente → Stato → Città
- **Punti di Interesse (POI)**: Visualizza storia, durata, coordinate
- **Filtri**: Categoria, orari, ricerca
- **Itinerari**: Genera percorsi in base al tempo disponibile
- **Curiosità**: Leggi fatti interessanti su ogni luogo

### 2. Pagina "Viaggia con Noi" — Offerte Viaggio
- **6 Offerte Esclusive**: Roma, Tokyo, Parigi, Bali, Barcellona, Londra
- **Filtri Dinamici**:
  - Per continente
  - Per prezzo (slider)
  - Per durata
- **Codici Sconto**:
  - `FAMIGLIA15` — 15% sconto per famiglie
  - `STUDENT20` — 20% sconto studenti
  - `SENIOR10` — 10% sconto over 65
  - `EARLY25` — 25% early bird
- **Login/Registrazione**: Salva in localStorage
- **Prenotazioni**: Salva prenotazioni localmente
- **Dettagli Offerta**: Modal con prezzi, incluso nel pacchetto, etc.

### 3. Assistente AI
- Pulsante "Assistente AI" in header
- Genera itinerari personalizzati
- Risponde a domande su destinazioni
- Proxy sicuro (chiave API lato server)
- Multi-turn conversation

### 4. Menu Hamburger (Mobile)
- Responsive design
- Menu collassabile su mobile (<768px)
- Link a Homepage e "Viaggia con Noi"

---

## 🔐 Sicurezza API

### Problema Risolto: Chiave API Esposta
La chiave API di Anthropic **NON viene mai esposta al client**.

**Flusso Sicuro:**
```
Client (browser) → POST /api/chat (messaggio + context)
  ↓
Server Node.js (Express) legge ANTHROPIC_API_KEY da process.env
  ↓
Chiama API Anthropic
  ↓
Invia risposta al client
```

**Impostazioni:**
- `config.js` ha `USE_PROXY: true`
- `.env` contiene la chiave (NON committare!)
- Client non sa mai la chiave

---

## 🎨 Design e Styling

### Palette Colori
- **Navy**: `#1C3050` (primario)
- **Oro**: `#B5892C` (accento)
- **Grigio**: Neutri caldi

### Breakpoints Responsive
- Desktop: > 1024px
- Tablet: 768px – 1024px
- Mobile: < 768px

### Font e Tipografia
- Font: Segoe UI, system-ui
- Font mono: Consolas (codici sconto)

---

## 💳 Database Offerte e Sconti

File: `public/data/travel-offers.js`

```javascript
TRAVEL_OFFERS = {
  offers: [
    {
      id: "offer_001",
      destinazione: "Roma, Italia",
      prezzo_base: 899,
      prezzo_scontato: 549,
      sconto_percentuale: 39,
      durata_giorni: 4,
      data_partenza: "2026-07-15",
      posti_disponibili: 12,
      incluso: ["Volo A/R", "Hotel 4 stelle", ...],
      immagine: "/images/destinations/roma.jpg"
    },
    // ...
  ],
  sconto_categorie: [
    { categoria: "Famiglia", sconto_aggiuntivo: 15, codice: "FAMIGLIA15" },
    // ...
  ]
}
```

---

## 🖼️ Immagini

### Struttura
```
public/images/
├── destinations/      # roma.jpg, tokyo.jpg, parigi.jpg, etc.
├── decorations/       # Hero images, patterns
└── README.md          # Istruzioni
```

### Fonti Consigliate
- **Unsplash**: https://unsplash.com/ (alta qualità, libero)
- **Pixabay**: https://pixabay.com/ (no attribuzione)
- **Pexels**: https://www.pexels.com/ (gratis)

### Come Aggiungere
1. Scarica immagini (800x600px consigliato)
2. Comprimi con TinyPNG (< 500KB)
3. Salva in `public/images/destinations/`
4. Aggiorna `travel-offers.js` con il percorso

---

## 📱 Autenticazione Locale

Le credenziali sono salvate in **localStorage** (no backend):

```javascript
localStorage.getItem('st_user') // {email, name, loginDate}
localStorage.getItem('st_bookings') // Array prenotazioni
```

**Nota**: In produzione, implementare backend con database.

---

## 🛠️ Comandi Disponibili

```bash
# Avvia il server in produzione
npm start

# Avvia con auto-reload (sviluppo)
npm run dev

# Regenera il database dati
node build-data.js
```

---

## ⚙️ Variabili di Configurazione

File: `public/javascript/config.js`

```javascript
// Proxy API
USE_PROXY: true                    // Usa Node.js proxy
API_PROXY_ENDPOINT: '/api/chat'

// AI Model
AI_MODEL: 'claude-3-5-sonnet-20241022'
AI_MAX_TOKENS: 1024

// Rate Limiting
RATE_LIMIT_CALLS: 8                // Max 8 messaggi/minuto

// Data
DATA_PATH: './data/data.json'
TOAST_DURATION_MS: 3000
```

---

## 📊 Dati e Struttura

### data.json (generato da build-data.js)
```json
{
  "continenti": [
    {
      "id": "africa",
      "nome": "Africa",
      "stati": [
        {
          "id": "egitto",
          "nome": "Egitto",
          "citta": [
            {
              "id": "cairo",
              "nome": "Cairo",
              "paese": "Egitto",
              "poi": [...]
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 🔄 Troubleshooting

### Errore: "Chiave API non configurata"
→ Aggiungi `ANTHROPIC_API_KEY` nel file `.env`

### Il menu ad albero non funziona
→ Verifica che `data.json` sia stato generato: `node build-data.js`

### Nessun dato visualizzato
→ Controlla che `public/data/data.json` esista e sia valido

### Errore 500 dal server
→ Avvia il server con `npm start` e guarda i log console

### Login non persiste al reload
→ localStorage è temporaneo nel dev locale. In produzione, usa database

---

## 📝 Note Sviluppo

### Security
- Frontend NON vede mai chiave API
- Tutte le richieste AI passano per proxy Node.js
- Input validati e sanitizzati (Security.Validator)
- CSP header su tutte le pagine

### Performance
- Database dati generato una sola volta
- CSS modularizzato per ridurre bundle
- Lazy loading immagini (quando aggiunte)
- LocalStorage per auth (no network)

### Accessibilità
- ARIA labels su tutti i form
- Focusable elements keyboard-navigable
- Screen reader friendly
- Contrasto colori conforme

---

## 🚀 Prossimi Passi Suggeriti

1. **Backend Autenticazione**: Implementare database (MongoDB, PostgreSQL)
2. **Pagamenti**: Integrare Stripe per prenotazioni vere
3. **Email**: Notifiche conferma prenotazione
4. **Analytics**: Tracking prenotazioni e utenti
5. **SEO**: Meta tags e Open Graph
6. **PWA**: Service worker e offline support

---

## 📄 Licenza

Sviluppato per uso educativo e personale.

