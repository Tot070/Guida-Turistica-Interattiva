# Immagini SmartTour

Questa cartella contiene le immagini utilizzate nel sito SmartTour.

## Struttura

```
images/
├── destinations/     # Immagini delle destinazioni (città)
├── decorations/      # Immagini decorative del sito
└── icons/           # Icone e loghi
```

## Fonti Immagini Consigliate

Per ottenere immagini gratuite e di qualità, puoi utilizzare:

1. **Unsplash** (https://unsplash.com/)
   - Licenza libera
   - Risoluzione alta
   - Esempio: `https://images.unsplash.com/photo-...`

2. **Pixabay** (https://pixabay.com/)
   - Immagini gratis
   - No attribuzione richiesta

3. **Pexels** (https://www.pexels.com/)
   - Foto di alta qualità gratuite

4. **Wikimedia Commons** (https://commons.wikimedia.org/)
   - Immagini storiche e geografiche

## Come Aggiungere Immagini

### Destinazioni (Roma, Tokyo, Parigi, ecc.)

Scarica immagini con il nome della città e salvale nella cartella `destinations/`:

```
images/destinations/
├── roma.jpg
├── tokyo.jpg
├── parigi.jpg
├── barcellona.jpg
├── londra.jpg
└── bali.jpg
```

### Decorazioni per il Sito

Immagini decorative per header, hero section, ecc.:

```
images/decorations/
├── hero-bg.jpg
├── world-map.svg
├── travel-icon.svg
└── pattern.png
```

## Formato Consigliato

- **Destinazioni**: 800x600px o superiore, JPG/WebP (qualità media)
- **Decorazioni**: Variabile, SVG preferibilmente per scalabilità
- **Size**: Mantieni sotto 500KB per pagina web (comprimere con tinypng.com)

## Caricamento Dinamico

Le immagini possono essere caricate in modo dinamico dal JavaScript:

```javascript
const imageUrl = `/images/destinations/roma.jpg`;
img.src = imageUrl;
```

## Note sulla Privacy

Non includiamo le immagini nel repository per motivi di licenza e dimensione.
Ogni sviluppatore può scaricare le proprie immagini rispettando le licenze.
