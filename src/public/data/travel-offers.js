/**
 * Dati di prezzi, sconti e offerte per biglietti e pacchetti viaggio
 * Usato dalla pagina "Viaggia con Noi"
 */

const TRAVEL_OFFERS = {
  "version": "1.0",
  "lastUpdated": "2026-06-24",
  "offers": [
    {
      "id": "offer_001",
      "destinazione": "Roma, Italia",
      "paese": "Italia",
      "continente": "Europa",
      "descrizione": "Scopri la magia della Città Eterna",
      "prezzo_base": 899,
      "prezzo_scontato": 549,
      "sconto_percentuale": 39,
      "durata_giorni": 4,
      "data_partenza": "2026-07-15",
      "data_ritorno": "2026-07-19",
      "posti_disponibili": 12,
      "incluso": [
        "Volo A/R",
        "Hotel 4 stelle",
        "Colazione",
        "Tour guidato 3 giorni",
        "Assicurazione viaggio"
      ],
      "immagine": "/images/destinations/roma.jpg"
    },
    {
      "id": "offer_002",
      "destinazione": "Tokyo, Giappone",
      "paese": "Giappone",
      "continente": "Asia",
      "descrizione": "Esperienza affascinante tra tradizione e modernità",
      "prezzo_base": 1599,
      "prezzo_scontato": 999,
      "sconto_percentuale": 37,
      "durata_giorni": 7,
      "data_partenza": "2026-08-01",
      "data_ritorno": "2026-08-08",
      "posti_disponibili": 8,
      "incluso": [
        "Volo A/R",
        "Hotel 5 stelle",
        "Colazione inclusa",
        "Tour di 5 giorni",
        "JR Pass 7 giorni",
        "Assicurazione"
      ],
      "immagine": "/images/destinations/tokyo.jpg"
    },
    {
      "id": "offer_003",
      "destinazione": "Parigi, Francia",
      "paese": "Francia",
      "continente": "Europa",
      "descrizione": "Città dell'amore e dell'arte",
      "prezzo_base": 799,
      "prezzo_scontato": 449,
      "sconto_percentuale": 44,
      "durata_giorni": 3,
      "data_partenza": "2026-07-22",
      "data_ritorno": "2026-07-25",
      "posti_disponibili": 20,
      "incluso": [
        "Volo A/R",
        "Hotel 4 stelle Marais",
        "Colazione",
        "Accesso Louvre",
        "Crociera Senna"
      ],
      "immagine": "/images/destinations/parigi.jpg"
    },
    {
      "id": "offer_004",
      "destinazione": "Bali, Indonesia",
      "paese": "Indonesia",
      "continente": "Asia",
      "descrizione": "Spiagge paradisiache e templi mistici",
      "prezzo_base": 1299,
      "prezzo_scontato": 799,
      "sconto_percentuale": 38,
      "durata_giorni": 5,
      "data_partenza": "2026-07-10",
      "data_ritorno": "2026-07-15",
      "posti_disponibili": 15,
      "incluso": [
        "Volo A/R",
        "Resort all-inclusive",
        "Lezioni di surf",
        "Tour culturale",
        "Spa e massaggi"
      ],
      "immagine": "/images/destinations/bali.jpg"
    },
    {
      "id": "offer_005",
      "destinazione": "Barcellona, Spagna",
      "paese": "Spagna",
      "continente": "Europa",
      "descrizione": "Arte, architettura e spiagge",
      "prezzo_base": 749,
      "prezzo_scontato": 449,
      "sconto_percentuale": 40,
      "durata_giorni": 3,
      "data_partenza": "2026-08-05",
      "data_ritorno": "2026-08-08",
      "posti_disponibili": 18,
      "incluso": [
        "Volo A/R",
        "Hotel 4 stelle",
        "Colazione",
        "Sagrada Familia",
        "Park Güell"
      ],
      "immagine": "/images/destinations/barcellona.jpg"
    },
    {
      "id": "offer_006",
      "destinazione": "Londra, Regno Unito",
      "paese": "Regno Unito",
      "continente": "Europa",
      "descrizione": "Cultura, storia e shopping a Londra",
      "prezzo_base": 699,
      "prezzo_scontato": 399,
      "sconto_percentuale": 43,
      "durata_giorni": 3,
      "data_partenza": "2026-07-20",
      "data_ritorno": "2026-07-23",
      "posti_disponibili": 22,
      "incluso": [
        "Volo A/R",
        "Hotel 4 stelle centro",
        "Colazione",
        "London Pass 3 giorni",
        "Tour autobus rosso"
      ],
      "immagine": "/images/destinations/londra.jpg"
    }
  ],

  "sconto_categorie": [
    {
      "categoria": "Famiglia (4 persone)",
      "sconto_aggiuntivo": 15,
      "codice": "FAMIGLIA15"
    },
    {
      "categoria": "Studenti (con carta)",
      "sconto_aggiuntivo": 20,
      "codice": "STUDENT20"
    },
    {
      "categoria": "Over 65",
      "sconto_aggiuntivo": 10,
      "codice": "SENIOR10"
    },
    {
      "categoria": "Early Bird (pre-booking)",
      "sconto_aggiuntivo": 25,
      "codice": "EARLY25"
    }
  ]
};

// Export per uso in Node/Webpack (se necessario)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TRAVEL_OFFERS;
}
