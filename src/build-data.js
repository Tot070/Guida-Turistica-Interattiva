/**
 * build-data.js
 * Scansiona i JSON dei continenti e genera un file data.json
 * strutturato per il frontend (continenti → stati → città → attrazioni)
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'public', 'data', 'json stati');
const OUTPUT_FILE = path.join(__dirname, 'public', 'data', 'data.json');

// Mapping categorie dalle descrizioni (semplificato)
function categorizeAttraction(descrizione) {
  const desc = descrizione.toLowerCase();
  if (desc.includes('museo') || desc.includes('arte') || desc.includes('galleria')) return 'Museo';
  if (desc.includes('chiesa') || desc.includes('basilica') || desc.includes('cattedrale') || desc.includes('santuario')) return 'Religione';
  if (desc.includes('palazzo') || desc.includes('castello') || desc.includes('fortezza')) return 'Architettura';
  if (desc.includes('parco') || desc.includes('giardino') || desc.includes('natura') || desc.includes('botanico')) return 'Natura';
  if (desc.includes('mercato') || desc.includes('gastronomia') || desc.includes('locale')) return 'Gastronomia';
  if (desc.includes('ponte') || desc.includes('piazza') || desc.includes('quartiere') || desc.includes('centro')) return 'Cultura';
  if (desc.includes('teatro') || desc.includes('opera') || desc.includes('culturale')) return 'Cultura';
  if (desc.includes('sito archeologico') || desc.includes('scavo')) return 'Storia';
  if (desc.includes('punto panoramico') || desc.includes('vista') || desc.includes('lungofiume')) return 'Natura';
  return 'Storia';
}

async function buildData() {
  console.log('📂 Scansionando continenti...');
  
  const continentiDati = [];
  
  try {
    const continenti = fs.readdirSync(DATA_DIR).filter(d => {
      const stat = fs.statSync(path.join(DATA_DIR, d));
      return stat.isDirectory();
    });

    console.log(`Found continenti: ${continenti.join(', ')}`);

    for (const continente of continenti) {
      const continentePath = path.join(DATA_DIR, continente);
      const files = fs.readdirSync(continentePath).filter(f => f.endsWith('.json'));
      
      const stati = [];

      for (const file of files) {
        const filePath = path.join(continentePath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const statoData = JSON.parse(content);

        const citta = statoData.citta.map(c => ({
          id: c.nome.toLowerCase().replace(/\s+/g, '_'),
          nome: c.nome,
          paese: statoData.paese,
          descrizioneBreve: `${c.nome}, ${statoData.paese}`,
          lingua: 'Non specificato',
          valuta: 'Non specificato',
          fusoOrario: 'Non specificato',
          poi: (c.attrazioni || []).map((attr, idx) => ({
            id: `poi_${c.nome.toLowerCase().replace(/\s+/g, '_')}_${idx}`,
            nome: attr.nome,
            categoria: categorizeAttraction(attr.descrizione_estesa),
            descrizione: attr.descrizione_estesa,
            durata: 1.5, // default 1.5 ore
            curiosita: `Scopri i dettagli storici e culturali di ${attr.nome} durante la tua visita a ${c.nome}.`,
            coordinate: attr.coordinate || { latitudine: 0, longitudine: 0 }
          }))
        }));

        stati.push({
          id: statoData.paese.toLowerCase().replace(/\s+/g, '_'),
          nome: statoData.paese,
          citta: citta
        });
      }

      continentiDati.push({
        id: continente.toLowerCase().replace(/\s+/g, '_'),
        nome: continente,
        stati: stati
      });
    }

    // Struttura finale: continenti con stati
    const dataStructure = {
      version: '1.0',
      lastUpdated: new Date().toISOString(),
      continenti: continentiDati
    };

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(dataStructure, null, 2), 'utf-8');
    console.log(`✅ Dati generati in: ${OUTPUT_FILE}`);
    console.log(`📊 ${continentiDati.length} continenti, ${continentiDati.reduce((sum, c) => sum + c.stati.length, 0)} stati`);

  } catch (err) {
    console.error('❌ Errore durante la generazione:', err.message);
    process.exit(1);
  }
}

buildData();
