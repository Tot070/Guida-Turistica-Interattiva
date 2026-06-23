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
 
 
// Avvio del sito con protocollo HTTP (PORTA 3000)
app.listen(3000, '0.0.0.0', () => {
  console.log('Server in ascolto su http://0.0.0.0:3000');
});
 