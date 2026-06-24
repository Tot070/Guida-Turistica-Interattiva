const express = require("express");
const path = require("path");
const crypto = require('crypto');
require('dotenv').config();
 
const app = express();
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
// Cartelle dinamiche
app.use(express.static('public'));
app.use(express.static('views'));
 
// --- ROTTE PAGINE HTML ---
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// --- PROXY API ANTHROPIC (SICURO) ---
// Legge la chiave da process.env.ANTHROPIC_API_KEY (nel .env)
// La chiave NON viene mai esposta al client
app.post('/api/chat', async (req, res) => {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('[API Proxy] ANTHROPIC_API_KEY non configurato in .env');
      return res.status(500).json({ error: 'Chiave API non configurata' });
    }

    const { messages, model, max_tokens, system } = req.body;

    // Validazione input minima
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Formato messaggio non valido' });
    }

    // Forward richiesta ad Anthropic
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2024-06-01'
      },
      body: JSON.stringify({
        model: model || 'claude-3-5-sonnet-20241022',
        max_tokens: max_tokens || 1024,
        system: system || '',
        messages: messages
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[API Proxy] Errore Anthropic:', data);
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (err) {
    console.error('[API Proxy] Errore:', err.message);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});
 
// Avvio del sito con protocollo HTTP (PORTA 3000)
app.listen(3000, '0.0.0.0', () => {
  console.log('Server in ascolto su http://0.0.0.0:3000');
});
 