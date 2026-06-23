const fs = require('fs');

const data = {
  versione: "1.0",
  aggiornato: "2026-06-22",
  schema: {
    nota: "Struttura standard POI: id, nome, categoria, durata (ore), descrizione, curiosita, coordinate {lat, lng}",
    categorie: ["Storia", "Arte", "Architettura", "Museo", "Natura", "Gastronomia", "Cultura"]
  },
  continenti: [

    // ══════════════════════════════════════════════════════════
    //  EUROPA
    // ══════════════════════════════════════════════════════════
    {
      id: "europa",
      nome: "Europa",
      citta: [

        {
          id: "roma",
          nome: "Roma",
          paese: "Italia",
          lingua: "Italiano",
          valuta: "EUR",
          fusoOrario: "UTC+1",
          coordinate: { lat: 41.9028, lng: 12.4964 },
          descrizioneBreve: "La Città Eterna, capitale dell'Italia e cuore dell'antico Impero Romano.",
          poi: [
            { id: 1, nome: "Colosseo", categoria: "Storia", durata: 2.0, descrizione: "Anfiteatro romano del I secolo d.C., simbolo assoluto di Roma e dell'Impero.", curiosita: "Poteva ospitare fino a 80.000 spettatori e disponeva di un sistema di corridoi sotterranei (ipogeo) per far apparire gladiatori e belve come per magia dall'arena.", coordinate: { lat: 41.8902, lng: 12.4922 } },
            { id: 2, nome: "Foro Romano", categoria: "Storia", durata: 1.5, descrizione: "Centro politico, religioso e commerciale dell'antica Roma, oggi vasto sito archeologico.", curiosita: "Il termine 'foro' deriva dal latino 'foris' (fuori): era letteralmente il luogo 'fuori' dalle mura della città originaria.", coordinate: { lat: 41.8925, lng: 12.4853 } },
            { id: 3, nome: "Musei Vaticani e Cappella Sistina", categoria: "Museo", durata: 3.0, descrizione: "Uno dei più grandi complessi museali al mondo, con la celeberrima volta affrescata da Michelangelo.", curiosita: "Michelangelo dipinse la volta della Cappella Sistina in soli 4 anni (1508-1512), lavorando quasi sempre in piedi su un'impalcatura, non sdraiato come spesso si crede.", coordinate: { lat: 41.9065, lng: 12.4536 } },
            { id: 4, nome: "Fontana di Trevi", categoria: "Arte", durata: 0.5, descrizione: "La più grande fontana barocca di Roma, punto di arrivo dell'acquedotto romano Acqua Vergine.", curiosita: "Ogni anno vengono gettate in fontana circa 3.000 euro al giorno in monete, devoluti dalla città alla Caritas per i bisognosi.", coordinate: { lat: 41.9009, lng: 12.4833 } },
            { id: 5, nome: "Quartiere Trastevere", categoria: "Gastronomia", durata: 2.0, descrizione: "Storico rione medievale con vicoli acciottolati, osterie tradizionali e vita notturna vivace.", curiosita: "Il nome deriva dal latino 'Trans Tiberim' (oltre il Tevere): era il quartiere degli stranieri e degli artigiani al di là del fiume nella Roma antica.", coordinate: { lat: 41.8897, lng: 12.4698 } }
          ]
        },

        {
          id: "parigi",
          nome: "Parigi",
          paese: "Francia",
          lingua: "Francese",
          valuta: "EUR",
          fusoOrario: "UTC+1",
          coordinate: { lat: 48.8566, lng: 2.3522 },
          descrizioneBreve: "La Ville Lumière, capitale della moda, dell'arte e della gastronomia mondiale.",
          poi: [
            { id: 1, nome: "Torre Eiffel", categoria: "Architettura", durata: 2.0, descrizione: "Iconica struttura metallica alta 330 metri, costruita da Gustave Eiffel per l'Esposizione Universale del 1889.", curiosita: "Alla costruzione fu inizialmente osteggiata da artisti e intellettuali parigini che la definirono 'scheletro disgustoso'. Avrebbe dovuto essere demolita dopo 20 anni.", coordinate: { lat: 48.8584, lng: 2.2945 } },
            { id: 2, nome: "Museo del Louvre", categoria: "Museo", durata: 3.0, descrizione: "Il museo più visitato al mondo, ospita oltre 35.000 opere tra cui la Gioconda e la Venere di Milo.", curiosita: "La Gioconda è esposta dietro un vetro blindato, a 4 metri di distanza dal pubblico, in una sala climatizzata a temperatura e umidità controllate. Ci vollero 700 anni di storia per trasformare il castello in museo.", coordinate: { lat: 48.8606, lng: 2.3376 } },
            { id: 3, nome: "Cattedrale di Notre-Dame", categoria: "Storia", durata: 1.0, descrizione: "Capolavoro del gotico francese risalente al XII secolo, riaperta nel 2024 dopo l'incendio del 2019.", curiosita: "La cattedrale fu ispirazione per il romanzo di Victor Hugo (1831): prima che il libro uscisse, Notre-Dame era in rovina e ignorata dai parigini. Il romanzo scatenò un movimento per il suo restauro.", coordinate: { lat: 48.8530, lng: 2.3499 } },
            { id: 4, nome: "Montmartre e Sacré-Cœur", categoria: "Arte", durata: 2.5, descrizione: "Collina bohémien con la basilica bianca del Sacré-Cœur e il villaggio degli artisti, ex casa di Picasso e Modigliani.", curiosita: "Montmartre era un comune indipendente fino al 1860. Il gesso estratto dalla collina (montmartre = monte dei martiri) fu usato in tutto il mondo: da qui il termine inglese 'plaster of Paris'.", coordinate: { lat: 48.8867, lng: 2.3431 } },
            { id: 5, nome: "Le Marais", categoria: "Cultura", durata: 2.0, descrizione: "Quartiere storico con palazzi rinascimentali, gallerie d'arte contemporanea e la vivace Place des Vosges.", curiosita: "Il Marais era la palude (marais) di Parigi fino al XII secolo. La Place des Vosges, costruita nel 1612, è la piazza più antica della città e conserva ancora la simmetria originale perfetta.", coordinate: { lat: 48.8558, lng: 2.3596 } }
          ]
        },

        {
          id: "londra",
          nome: "Londra",
          paese: "Regno Unito",
          lingua: "Inglese",
          valuta: "GBP",
          fusoOrario: "UTC+0",
          coordinate: { lat: 51.5074, lng: -0.1278 },
          descrizioneBreve: "Capitale del Regno Unito, metropoli globale che fonde storia secolare e cultura contemporanea.",
          poi: [
            { id: 1, nome: "Tower of London", categoria: "Storia", durata: 2.0, descrizione: "Fortezza normanna millenaria che ha servito da palazzo reale, prigione, zecca e custode dei Gioielli della Corona.", curiosita: "I sei corvi della Torre devono rimanere lì per legge: secondo la leggenda, se dovessero andarsene, la Torre e la monarchia crollerebbero. Ogni corvo ha un'ala rifilata per sicurezza.", coordinate: { lat: 51.5081, lng: -0.0759 } },
            { id: 2, nome: "British Museum", categoria: "Museo", durata: 3.0, descrizione: "Uno dei più antichi e grandi musei al mondo, con oltre 8 milioni di oggetti dalla preistoria all'era moderna.", curiosita: "La Stele di Rosetta, esposta al museo, è l'oggetto più fotografato del British Museum. Fu la chiave per decifrare i geroglifici egizi nel 1822, ma la Grecia e l'Egitto ne chiedono ancora la restituzione.", coordinate: { lat: 51.5194, lng: -0.1270 } },
            { id: 3, nome: "Buckingham Palace", categoria: "Architettura", durata: 1.5, descrizione: "Residenza ufficiale del sovrano britannico, con il celebre cambio della guardia ogni giorno.", curiosita: "Il palazzo ha 775 stanze, 78 bagni e circa 400 dipendenti. La Regina Vittoria fu la prima sovrana a abitarci nel 1837: prima era solo una residenza privata.", coordinate: { lat: 51.5014, lng: -0.1419 } },
            { id: 4, nome: "Hyde Park", categoria: "Natura", durata: 1.5, descrizione: "Il più famoso dei parchi reali londinesi, con il lago Serpentine e il leggendario Speakers' Corner.", curiosita: "Speakers' Corner, angolo nord-est del parco, è dal 1872 il luogo dove chiunque può salire su una cassa di sapone e parlare di qualunque argomento senza essere arrestato — tranne della famiglia reale.", coordinate: { lat: 51.5073, lng: -0.1657 } },
            { id: 5, nome: "Borough Market", categoria: "Gastronomia", durata: 1.0, descrizione: "Uno dei mercati alimentari più antichi di Londra (1014 d.C.), con oltre 100 bancarelle di specialità internazionali.", curiosita: "Durante la Seconda Guerra Mondiale il mercato fu chiuso come misura di oscuramento antiaereo. Sopravvisse ai bombardamenti e riaprì, diventando il simbolo della resistenza civile londinese.", coordinate: { lat: 51.5055, lng: -0.0910 } }
          ]
        },

        {
          id: "berlino",
          nome: "Berlino",
          paese: "Germania",
          lingua: "Tedesco",
          valuta: "EUR",
          fusoOrario: "UTC+1",
          coordinate: { lat: 52.5200, lng: 13.4050 },
          descrizioneBreve: "Capitale tedesca, città della storia divisa e riunificata, cuore della scena artistica europea.",
          poi: [
            { id: 1, nome: "Porta di Brandeburgo", categoria: "Storia", durata: 0.5, descrizione: "Simbolo della riunificazione tedesca, costruita nel 1791 come arco trionfale neoclassico.", curiosita: "Durante la divisione della città la Porta si trovava nel territorio della DDR, inaccessibile a berlinesi dell'Ovest. Fu il punto di incontro simbolico quando il Muro cadde la notte del 9 novembre 1989.", coordinate: { lat: 52.5163, lng: 13.3777 } },
            { id: 2, nome: "East Side Gallery", categoria: "Arte", durata: 1.5, descrizione: "Il più lungo tratto superstite del Muro di Berlino, 1,3 km di murales di artisti da tutto il mondo.", curiosita: "Il murales più famoso, 'Il Bacio Fraterno' tra Honecker e Breznev, fu dipinto nel 1990 da Dmitri Vrubel. È un'ironia storica: il muro che divideva ora ospita arte che celebra l'unione.", coordinate: { lat: 52.5050, lng: 13.4399 } },
            { id: 3, nome: "Pergamon Museum", categoria: "Museo", durata: 2.5, descrizione: "Museo dell'Isola dei Musei che ospita monumenti antichi a scala reale, tra cui l'Altare di Pergamo e la Porta di Babilonia.", curiosita: "La Porta di Mileto esposta al museo è una struttura originale del II secolo d.C. smontata pietra per pietra in Turchia e ricostruita a Berlino. Pesa circa 1.200 tonnellate.", coordinate: { lat: 52.5212, lng: 13.3967 } },
            { id: 4, nome: "Reichstag con Cupola di Foster", categoria: "Architettura", durata: 1.5, descrizione: "Sede del Parlamento tedesco con la cupola di vetro trasparente progettata da Norman Foster — simbolo di democrazia e trasparenza.", curiosita: "La cupola fu progettata con uno specchio a forma di imbuto al centro che convoglia luce naturale nell'aula parlamentare. I visitatori camminano letteralmente sopra i deputati che legiferano.", coordinate: { lat: 52.5186, lng: 13.3762 } },
            { id: 5, nome: "Mauerpark", categoria: "Cultura", durata: 2.0, descrizione: "Parco pubblico che sorge sull'ex 'striscia della morte' del Muro: ogni domenica ospita il più grande mercatino delle pulci d'Europa.", curiosita: "Il karaoke all'aperto del Mauerpark ogni domenica riunisce migliaia di persone in un anfiteatro informale. Il nome del parco significa letteralmente 'Parco del Muro'.", coordinate: { lat: 52.5429, lng: 13.4022 } }
          ]
        },

        {
          id: "madrid",
          nome: "Madrid",
          paese: "Spagna",
          lingua: "Spagnolo",
          valuta: "EUR",
          fusoOrario: "UTC+1",
          coordinate: { lat: 40.4168, lng: -3.7038 },
          descrizioneBreve: "Capitale spagnola, città vivace con uno dei più grandi patrimoni artistici d'Europa.",
          poi: [
            { id: 1, nome: "Museo del Prado", categoria: "Museo", durata: 3.0, descrizione: "Uno dei musei più importanti al mondo, con oltre 20.000 opere tra cui Velázquez, Goya e El Greco.", curiosita: "Le Meninas di Velázquez è considerato tecnicamente il dipinto più complesso della storia dell'arte per l'uso della prospettiva e degli specchi. Picasso dedicò un anno intero a studiarlo.", coordinate: { lat: 40.4138, lng: -3.6921 } },
            { id: 2, nome: "Parco del Retiro", categoria: "Natura", durata: 1.5, descrizione: "125 ettari di verde nel cuore di Madrid, con lago, rose e il Crystal Palace in vetro e ferro.", curiosita: "Il Retiro fu per secoli giardino privato reale, aperto al pubblico solo nel 1868. Il Crystal Palace fu costruito nel 1887 per ospitare una mostra sulle Filippine — allora colonia spagnola.", coordinate: { lat: 40.4153, lng: -3.6844 } },
            { id: 3, nome: "Plaza Mayor", categoria: "Storia", durata: 1.0, descrizione: "Piazza barocca del XVII secolo circondata da 237 balconi, cuore storico della vita pubblica madrilena.", curiosita: "La Plaza Mayor fu teatro di autodafé dell'Inquisizione, mercati, tornei e persino corride fino al 1878. Il fabbro Juan de Herrera vi fu giustiziato: la sua casa è oggi un ristorante frequentato dai turisti.", coordinate: { lat: 40.4154, lng: -3.7074 } },
            { id: 4, nome: "Palazzo Reale di Madrid", categoria: "Architettura", durata: 2.0, descrizione: "Il palazzo reale più grande d'Europa con 3.418 stanze, residenza ufficiale (non abitativa) della famiglia reale.", curiosita: "Il palazzo fu costruito dopo che un incendio distrusse l'Alcázar nel 1734. Filippo V ordinò che fosse costruito in pietra — non in legno come il precedente — per evitare un altro incendio.", coordinate: { lat: 40.4179, lng: -3.7143 } },
            { id: 5, nome: "Mercado de San Miguel", categoria: "Gastronomia", durata: 1.0, descrizione: "Storico mercato coperto di ferro del 1916, rinnovato a galleria gourmet con tapas, vini e prodotti artigianali.", curiosita: "Il mercato fu il primo mercato al coperto di Madrid. Dopo la crisi degli anni 2000 stava per essere demolito: fu salvato da un gruppo di investitori privati e trasformato nel modello di mercato gourmet che ispirò tutta Europa.", coordinate: { lat: 40.4151, lng: -3.7087 } }
          ]
        },

        {
          id: "praga",
          nome: "Praga",
          paese: "Repubblica Ceca",
          lingua: "Ceco",
          valuta: "CZK",
          fusoOrario: "UTC+1",
          coordinate: { lat: 50.0755, lng: 14.4378 },
          descrizioneBreve: "La 'Città d'Oro', conserva uno dei centri storici medievali meglio preservati d'Europa.",
          poi: [
            { id: 1, nome: "Castello di Praga", categoria: "Storia", durata: 2.5, descrizione: "Il più grande complesso di castelli al mondo, residenza dei re boemi e oggi sede presidenziale.", curiosita: "Il castello occupa un'area di 70.000 mq — più grande di 7 campi da calcio — e include una cattedrale, un palazzo reale, chiese, giardini e una strada intera al suo interno.", coordinate: { lat: 50.0906, lng: 14.4010 } },
            { id: 2, nome: "Ponte Carlo", categoria: "Architettura", durata: 1.0, descrizione: "Ponte gotico del XIV secolo ornato da 30 statue barocche, che attraversa la Moldava unendo Città Vecchia e Piccolo Quartiere.", curiosita: "La prima pietra fu posata il 9 luglio 1357 alle 5:31 dal re Carlo IV. La sequenza 1-3-5-7-9-7-5-3-1 (palindroma) fu scelta deliberatamente come numero magico per garantire solidità eterna.", coordinate: { lat: 50.0865, lng: 14.4112 } },
            { id: 3, nome: "Piazza della Città Vecchia e Orologio Astronomico", categoria: "Storia", durata: 1.5, descrizione: "Cuore medievale di Praga con l'Orologio Astronomico del 1410, che ogni ora anima le sue figure meccaniche.", curiosita: "Secondo la leggenda, quando l'orologio fu terminato, il Consiglio della Città fece accecare il maestro orologiaio Hanuš per impedirgli di costruirne uno uguale altrove. Lui si vendicò sabotando i meccanismi prima di morire.", coordinate: { lat: 50.0875, lng: 14.4213 } },
            { id: 4, nome: "Vicolo d'Oro", categoria: "Storia", durata: 1.0, descrizione: "Stradina medievale con minuscole casette colorate all'interno del Castello: vi abitò Franz Kafka nel 1916-1917.", curiosita: "Il nome non deriva dall'oro ma dagli orafi che vi abitarono nel XVII secolo. Franz Kafka vi scrisse alcuni dei suoi racconti più inquietanti affittando il numero 22 dalla sorella Ottla.", coordinate: { lat: 50.0910, lng: 14.4040 } },
            { id: 5, nome: "Quartiere Ebraico (Josefov)", categoria: "Cultura", durata: 2.0, descrizione: "L'ex ghetto ebraico conserva sei sinagoghe storiche e il Cimitero Ebraico Antico con oltre 12.000 lapidi sovrapposte.", curiosita: "Il Cimitero Antico fu usato per secoli perché agli ebrei era vietato seppellire i morti altrove. Le tombe sono impilate in fino a 12 strati: si stima siano sepolte oltre 100.000 persone in un'area di 1.500 mq.", coordinate: { lat: 50.0902, lng: 14.4184 } }
          ]
        }

      ]
    },

    // ══════════════════════════════════════════════════════════
    //  AMERICA DEL NORD
    // ══════════════════════════════════════════════════════════
    {
      id: "america_nord",
      nome: "America del Nord",
      citta: [

        {
          id: "washington",
          nome: "Washington D.C.",
          paese: "Stati Uniti d'America",
          lingua: "Inglese",
          valuta: "USD",
          fusoOrario: "UTC-5",
          coordinate: { lat: 38.9072, lng: -77.0369 },
          descrizioneBreve: "Capitale federale degli USA, città-monumento dove storia, politica e cultura si incontrano.",
          poi: [
            { id: 1, nome: "Lincoln Memorial", categoria: "Storia", durata: 1.0, descrizione: "Imponente tempio neoclassico dedicato ad Abraham Lincoln, teatro del discorso 'I Have a Dream' di Martin Luther King nel 1963.", curiosita: "La statua di Lincoln è alta 5,8 metri: se si alzasse sarebbe alta circa 28 metri. Gli occhi della statua, contrariamente all'aspetto cieco, sembrano seguire lo spettatore da qualunque angolazione.", coordinate: { lat: 38.8893, lng: -77.0502 } },
            { id: 2, nome: "Smithsonian National Museum of Natural History", categoria: "Museo", durata: 3.0, descrizione: "Uno dei musei più visitati al mondo, con oltre 145 milioni di oggetti tra cui il Diamante Hope.", curiosita: "Il Diamante Hope, esposto al museo, pesa 45,52 carati ed è maledetto secondo la leggenda: ogni proprietario avrebbe subito sventure. La Smithsonian lo ricevette in busta per posta nel 1958.", coordinate: { lat: 38.8913, lng: -77.0261 } },
            { id: 3, nome: "Campidoglio degli Stati Uniti", categoria: "Architettura", durata: 1.5, descrizione: "Sede del Congresso americano con la celebre cupola bianca, fulcro del sistema politico statunitense.", curiosita: "La Statua della Libertà sopra la cupola (non quella di New York) fu montata il 2 dicembre 1863, nel pieno della Guerra Civile. Il Presidente Lincoln insistette affinché i lavori continuassero per dimostrare che l'Unione sarebbe sopravvissuta.", coordinate: { lat: 38.8899, lng: -77.0091 } },
            { id: 4, nome: "National Mall", categoria: "Natura", durata: 1.0, descrizione: "Il 'parco del popolo americano', viale monumentale di 3 km che collega il Lincoln Memorial al Campidoglio tra musei e memoriali.", curiosita: "I ciliegi (Yoshino Cherry) intorno al Tidal Basin furono regalati dal Giappone nel 1912. Ogni anno la loro fioritura genera un festival da oltre 1,5 milioni di visitatori — e un traffico caotico che dura 2 settimane.", coordinate: { lat: 38.8895, lng: -77.0353 } },
            { id: 5, nome: "National Gallery of Art", categoria: "Arte", durata: 2.5, descrizione: "Uno dei musei d'arte più importanti degli USA, con opere dal Medioevo all'arte contemporanea, ingresso gratuito.", curiosita: "L'ala Est, progettata da I.M. Pei (lo stesso della piramide del Louvre), fu costruita su un lotto triangolare irregolare. Per unirla all'ala Ovest fu creato un tunnel sotterraneo: alla giunzione delle due ali si vede l'angolo più acuto di tutto l'edificio.", coordinate: { lat: 38.8913, lng: -77.0199 } }
          ]
        },

        {
          id: "ottawa",
          nome: "Ottawa",
          paese: "Canada",
          lingua: "Inglese / Francese",
          valuta: "CAD",
          fusoOrario: "UTC-5",
          coordinate: { lat: 45.4215, lng: -75.6972 },
          descrizioneBreve: "Capitale del Canada, città bilingue che bilancia architettura vittoriana e modernità multiculturale.",
          poi: [
            { id: 1, nome: "Parlamento del Canada (Parliament Hill)", categoria: "Architettura", durata: 2.0, descrizione: "Complesso neogotico sulla collina affacciata sul fiume Ottawa, sede del governo federale canadese.", curiosita: "La Fiamma Centennale davanti al Parlamento brucia ininterrottamente dal 1967, alimentata da gas naturale. Non si è mai spenta tranne una volta nel 2008 per manutenzione — e i canadesi se ne accorsero subito.", coordinate: { lat: 45.4253, lng: -75.7009 } },
            { id: 2, nome: "Museo Canadese della Storia", categoria: "Museo", durata: 2.5, descrizione: "Il museo più visitato del Canada, con la Grande Sala degli Indiani del Pacifico e la collezione di pali totem più grande al coperto del mondo.", curiosita: "L'edificio fu progettato dall'architetto indigeno Douglas Cardinal con forme curve che evocano le colline erose dal ghiacciaio. È l'unico grande museo al mondo progettato da un architetto indigeno.", coordinate: { lat: 45.4294, lng: -75.7116 } },
            { id: 3, nome: "Canale Rideau", categoria: "Natura", durata: 1.5, descrizione: "Patrimonio UNESCO, canale del 1832 che in estate si percorre in barca e d'inverno diventa la pista di pattinaggio naturale più lunga del mondo.", curiosita: "In inverno il canale diventa una pista di 7,8 km: i residenti ci vanno al lavoro pattinando. Ogni anno vengono distribuite 170.000 tazze di cioccolata calda e 60.000 BeaverTail (dolce tipico) lungo le rive.", coordinate: { lat: 45.4215, lng: -75.6900 } },
            { id: 4, nome: "Mercato Byward", categoria: "Gastronomia", durata: 1.0, descrizione: "Il mercato pubblico più antico del Canada (1826), oggi vivace quartiere con ristoranti, bancarelle e artigianato locale.", curiosita: "Il BeaverTail, dolce tipico canadese a forma di coda di castoro, è stato inventato proprio qui nel 1978. Barack Obama ne mangiò uno durante una visita ufficiale nel 2009, rendendolo famoso in tutto il mondo.", coordinate: { lat: 45.4270, lng: -75.6910 } },
            { id: 5, nome: "Museo delle Belle Arti del Canada", categoria: "Arte", durata: 2.0, descrizione: "Il principale museo d'arte del Canada, con la più grande collezione di arte canadese e indigena al mondo.", curiosita: "Il museo ospita la cappella ridotta in pezzi della Rideau Street Convent (1888), smontata mattone per mattone per preservarla dalla demolizione e ricostruita all'interno del museo moderno.", coordinate: { lat: 45.4297, lng: -75.6991 } }
          ]
        },

        {
          id: "citta_del_messico",
          nome: "Città del Messico",
          paese: "Messico",
          lingua: "Spagnolo",
          valuta: "MXN",
          fusoOrario: "UTC-6",
          coordinate: { lat: 19.4326, lng: -99.1332 },
          descrizioneBreve: "Megalopoli costruita sulle rovine azteca di Tenochtitlán, capitale più popolosa del Nord America.",
          poi: [
            { id: 1, nome: "Piramidi di Teotihuacan", categoria: "Storia", durata: 4.0, descrizione: "La più grande città precolombiana delle Americhe, con la Piramide del Sole (la terza più grande al mondo) a 50 km dalla capitale.", curiosita: "Il nome Teotihuacan in lingua nahuatl significa 'Il luogo dove gli uomini diventano dei'. Nessuno sa chi la costruì: era già una città abbandonata e misteriosa quando gli Aztechi la scoprirono.", coordinate: { lat: 19.6925, lng: -98.8438 } },
            { id: 2, nome: "Zócalo e Cattedrale Metropolitana", categoria: "Storia", durata: 2.0, descrizione: "La seconda piazza più grande al mondo, con la cattedrale barocca costruita sopra le fondamenta del Templo Mayor azteco.", curiosita: "La cattedrale sprofonda di circa 10 cm ogni decennio perché costruita sul lago prosciugato di Texcoco. I pilastri del lato sinistro sono 2 metri più in basso rispetto al lato destro.", coordinate: { lat: 19.4326, lng: -99.1332 } },
            { id: 3, nome: "Museo Nazionale di Antropologia", categoria: "Museo", durata: 3.0, descrizione: "Il più importante museo dell'America Latina, ospita la Piedra del Sol (Calendario Azteco) e tesori di 12 civiltà precolombiane.", curiosita: "La sala degli Aztechi è sormontata da un monolite da 167 tonnellate sollevato da un solo pilastro a fungo: un'impresa ingegneristica che nel 1964 lasciò increduli gli esperti mondiali.", coordinate: { lat: 19.4860, lng: -99.1869 } },
            { id: 4, nome: "Xochimilco", categoria: "Natura", durata: 2.5, descrizione: "Rete di canali aztecchi patrimonio UNESCO, con le trajineras (barche colorate) e le chinampas (isole galleggianti artificiali).", curiosita: "Le chinampas sono isole artificiali create dagli Aztechi intrecciando rami e radici nel lago. Alcune hanno oltre 700 anni e producono ancora verdure per la città. La piccola Isla de las Muñecas è famosa per le bambole appese agli alberi.", coordinate: { lat: 19.2565, lng: -99.0948 } },
            { id: 5, nome: "Casa di Frida Kahlo (Casa Azul)", categoria: "Arte", durata: 2.0, descrizione: "La casa natale e studio dell'artista nel quartiere di Coyoacán, oggi museo che ne conserva la vita privata e l'arte.", curiosita: "Frida Kahlo nacque e morì nella Casa Azul. Dopo la sua morte nel 1954, Diego Rivera sigillò uno dei bagni per 15 anni. Quando fu aperto, contenevano centinaia di oggetti personali mai mostrati al pubblico.", coordinate: { lat: 19.3554, lng: -99.1626 } }
          ]
        },

        {
          id: "havana",
          nome: "L'Avana",
          paese: "Cuba",
          lingua: "Spagnolo",
          valuta: "CUP",
          fusoOrario: "UTC-5",
          coordinate: { lat: 23.1136, lng: -82.3666 },
          descrizioneBreve: "Capitale cubana dove auto d'epoca, musica son e architettura coloniale creano un'atmosfera unica al mondo.",
          poi: [
            { id: 1, nome: "La Habana Vieja", categoria: "Storia", durata: 3.0, descrizione: "Centro storico patrimonio UNESCO, labirinto di palazzi coloniali spagnoli, cortili, cattedrale e fortezze del XVI-XVII secolo.", curiosita: "L'Avana vecchia ha oltre 3.000 edifici storici. Il processo di restauro è unico al mondo: le famiglie vivono ancora negli edifici mentre vengono restaurati, e parte dei proventi del turismo finanzia direttamente i lavori.", coordinate: { lat: 23.1363, lng: -82.3490 } },
            { id: 2, nome: "Malecón", categoria: "Cultura", durata: 1.5, descrizione: "Il lungomare di 8 km è il salotto all'aperto dell'Avana: pescatori, musicisti, innamorati e vecchie Cadillac coesistono ogni sera.", curiosita: "Durante l'uragano del 2017 le onde del Malecón invasero il primo piano degli edifici. I cubani non scappano: portano gli spritz e guardano il mare. Il Malecón è il 'divano' della città.", coordinate: { lat: 23.1365, lng: -82.3650 } },
            { id: 3, nome: "Museo de la Revolución", categoria: "Museo", durata: 2.0, descrizione: "Nell'ex palazzo presidenziale di Batista, racconta la storia della rivoluzione cubana con il Granma — lo yacht che portò Castro a Cuba — esposto in teca.", curiosita: "Il Granma trasportò 82 guerriglieri (tra cui Che Guevara) dal Messico a Cuba nel 1956 per iniziare la rivoluzione. L'imbarcazione era progettata per 12 persone. Sopravvissero in 19 alle prime settimane.", coordinate: { lat: 23.1354, lng: -82.3565 } },
            { id: 4, nome: "Fabbrica de Arte Cubano", categoria: "Arte", durata: 2.0, descrizione: "Ex fabbrica di olio trasformata in spazio multidisciplinare con gallerie, musica dal vivo, cinema e performance ogni sera.", curiosita: "La FAC nasce da un'idea del musicista X Alfonso nel 2014. Nello stesso edificio dove si produceva olio per cottura si producono ora arte contemporanea e cultura: i silos dell'olio sono diventati stanze di installazione.", coordinate: { lat: 23.1162, lng: -82.3951 } },
            { id: 5, nome: "Callejón de Hamel", categoria: "Arte", durata: 1.0, descrizione: "Vicolo afro-cubano trasformato in galleria d'arte all'aperto con murales, sculture, ruota della santería e musica rumba ogni domenica.", curiosita: "Il vicolo fu trasformato dall'artista Salvador González nel 1990. Ogni murales ha un significato nella religione yoruba-cubana. Il progetto ha ispirato decine di callejones simili in tutta l'isola.", coordinate: { lat: 23.1232, lng: -82.3791 } }
          ]
        },

        {
          id: "guatemala_city",
          nome: "Guatemala City",
          paese: "Guatemala",
          lingua: "Spagnolo",
          valuta: "GTQ",
          fusoOrario: "UTC-6",
          coordinate: { lat: 14.6349, lng: -90.5069 },
          descrizioneBreve: "Capitale del Guatemala, città moderna circondata da vulcani attivi e heritage maya.",
          poi: [
            { id: 1, nome: "Centro Histórico e Parque Central", categoria: "Storia", durata: 2.0, descrizione: "Il cuore coloniale della capitale con la Cattedrale Metropolitana, il Palazzo Nazionale della Cultura e i palazzi del XVIII-XIX secolo.", curiosita: "Il Palazzo Nazionale fu costruito da Jorge Ubico tra il 1939 e il 1943 interamente in marmo verde guatemalteco. Ci vollero 4 anni e 2.000 operai per completarlo: un record per l'America Centrale dell'epoca.", coordinate: { lat: 14.6411, lng: -90.5133 } },
            { id: 2, nome: "Museo Nacional de Arqueología y Etnología", categoria: "Museo", durata: 2.0, descrizione: "La più grande collezione di reperti Maya del mondo, incluso il trono giada di Piedras Negras e maschere funerarie d'oro.", curiosita: "La stele Maya più alta al mondo (9 metri) esposta nel museo proviene da Quiriguá. Gli Aztechi consideravano la giada più preziosa dell'oro: un solo gioiello in giada valeva più di decine di pezzi d'oro.", coordinate: { lat: 14.6143, lng: -90.5162 } },
            { id: 3, nome: "Mercado Central", categoria: "Gastronomia", durata: 1.5, descrizione: "Il mercato sotterraneo nel cuore del centro storico, con artigianato indigeno, tessuti tradizionali e cibo tipico guatemalteco.", curiosita: "Il tessuto tipico guatemalteco (huipil) è diverso per ogni villaggio: i disegni comunicano la comunità di appartenenza, lo stato civile e persino l'anno di nascita. Ogni donna impara a tesserlo dall'età di 5 anni.", coordinate: { lat: 14.6414, lng: -90.5107 } },
            { id: 4, nome: "Cerro del Carmen", categoria: "Natura", durata: 1.0, descrizione: "Collina con la cappella più antica di Guatemala City (1620) e panorama sui vulcani Agua, Fuego e Acatenango.", curiosita: "Da questa collina si vedono simultaneamente tre vulcani. Il Volcán de Fuego è uno dei vulcani più attivi del mondo: erutta in media ogni 15-20 minuti, ed è visibile di notte come una torcia arancione.", coordinate: { lat: 14.6480, lng: -90.5150 } },
            { id: 5, nome: "Popol Vuh Museum", categoria: "Cultura", durata: 1.5, descrizione: "Museo universitario con la più importante collezione di arte precolombiana privata del Guatemala, incluse ceramiche Maya classiche.", curiosita: "Il Popol Vuh è il libro sacro Maya-Quiché, l'equivalente maya della Bibbia. Il manoscritto originale fu trascritto segretamente da un indigeno nel XVI secolo per salvarlo dalla distruzione spagnola.", coordinate: { lat: 14.5991, lng: -90.5143 } }
          ]
        },

        {
          id: "san_salvador",
          nome: "San Salvador",
          paese: "El Salvador",
          lingua: "Spagnolo",
          valuta: "USD",
          fusoOrario: "UTC-6",
          coordinate: { lat: 13.6929, lng: -89.2182 },
          descrizioneBreve: "Capitale di El Salvador, città resiliente tra vulcani e una storia di rinascita dopo decenni di conflitto.",
          poi: [
            { id: 1, nome: "Centro Histórico e Catedral Metropolitana", categoria: "Storia", durata: 2.0, descrizione: "Il cuore della capitale con la cattedrale barocca che custodisce la tomba dell'arcivescovo Romero, beatificato nel 2015.", curiosita: "L'Arcivescovo Oscar Romero fu assassinato durante una messa nel 1980 per le sue posizioni a favore dei poveri contro la giunta militare. Il suo assassinio fu ordinato da un ex ufficiale: un crimine mai completamente risolto.", coordinate: { lat: 13.6988, lng: -89.1914 } },
            { id: 2, nome: "Volcán de San Salvador (Boquerón)", categoria: "Natura", durata: 3.0, descrizione: "Vulcano attivo a 12 km dalla capitale, con un cratere di 1,5 km di diametro e un mini-cono secondario al suo interno.", curiosita: "Dentro il cratere principale del Boquerón ne è cresciuto un secondo durante l'eruzione del 1917. Gli abitanti del luogo lo chiamano 'El Boqueróncito': un vulcano che ha generato un figlio vulcano.", coordinate: { lat: 13.7364, lng: -89.2862 } },
            { id: 3, nome: "Museo Nacional David J. Guzmán", categoria: "Museo", durata: 2.0, descrizione: "Il principale museo nazionale, con reperti Maya, Olmeca e oggetti della cultura Pipil che abitava il territorio prima della conquista.", curiosita: "El Salvador è il solo paese centroamericano senza sbocco sul Caribe eppure aveva intense rotte commerciali con le civiltà Maya. I reperti Maya rinvenuti qui si trovano a 500 km dal cuore della civiltà maya classica.", coordinate: { lat: 13.6989, lng: -89.2275 } },
            { id: 4, nome: "Mercado Ex-Cuartel", categoria: "Gastronomia", durata: 1.0, descrizione: "Ex caserma militare convertita nel mercato artigianale più caratteristico della capitale, con pupuserías e artigianato locale.", curiosita: "La pupusa è il piatto nazionale salvadoregno e precolombiano: le donne Pipil la preparavano già 2.000 anni fa con mais e fagioli. El Salvador celebra la Giornata Nazionale della Pupusa ogni secondo sabato di novembre.", coordinate: { lat: 13.6985, lng: -89.1905 } },
            { id: 5, nome: "Parque Balboa e Puerta del Diablo", categoria: "Natura", durata: 1.5, descrizione: "Parco naturale sulle colline a Sud della capitale con la formazione rocciosa 'Porta del Diavolo', con vista su tutta la pianura costiera.", curiosita: "La Puerta del Diablo prese il nome dalle popolazioni indigene locali che la consideravano l'ingresso del mondo sotterraneo. Durante la guerra civile (1979-1992) fu usata come sito di esecuzioni, ma è stata recuperata come meta turistica.", coordinate: { lat: 13.6369, lng: -89.2236 } }
          ]
        }

      ]
    },

    // ══════════════════════════════════════════════════════════
    //  AMERICA DEL SUD
    // ══════════════════════════════════════════════════════════
    {
      id: "america_sud",
      nome: "America del Sud",
      citta: [

        {
          id: "brasilia",
          nome: "Brasilia",
          paese: "Brasile",
          lingua: "Portoghese",
          valuta: "BRL",
          fusoOrario: "UTC-3",
          coordinate: { lat: -15.8267, lng: -47.9218 },
          descrizioneBreve: "Capitale modernista costruita dal nulla nel 1960, capolavoro urbanistico di Oscar Niemeyer e Lúcio Costa.",
          poi: [
            { id: 1, nome: "Congresso Nazionale", categoria: "Architettura", durata: 1.5, descrizione: "Il simbolo architettonico di Brasilia: due cupole speculari — una convessa per il Senato, una concava per la Camera — progettate da Niemeyer.", curiosita: "La forma della cupola convessa (Senato) rappresenta qualcosa di chiuso, conservatore; quella concava (Camera) qualcosa di aperto, ricettivo. Niemeyer inserì questo simbolismo politico volutamente nel progetto.", coordinate: { lat: -15.7998, lng: -47.8645 } },
            { id: 2, nome: "Cattedrale di Brasilia", categoria: "Architettura", durata: 1.0, descrizione: "Capolavoro di Niemeyer: 16 pilastri di cemento che simulano mani protese verso il cielo, con interno vetrato bianco e vetrate colorate.", curiosita: "L'interno della cattedrale è interamente sotto il livello del suolo: si entra da un tunnel buio per emergere nella luce bianca dell'interno. Niemeyer voleva che l'ingresso rappresentasse il passaggio dalla tenebra alla luce divina.", coordinate: { lat: -15.7986, lng: -47.8756 } },
            { id: 3, nome: "Palazzo dell'Aurora (Residenza Presidenziale)", categoria: "Architettura", durata: 1.0, descrizione: "Residenza ufficiale del Presidente brasiliano, con i celebri muxarabis (colonne cavo-alveolate) che filtrano la luce tropicale.", curiosita: "Il Palazzo fu costruito in soli 10 mesi per essere pronto per l'inaugurazione di Brasilia nel 1960. Niemeyer progettò simultaneamente decine di edifici principali: lavorava giorno e notte con un team di disegnatori.", coordinate: { lat: -15.7996, lng: -47.8610 } },
            { id: 4, nome: "Lago Paranoá", categoria: "Natura", durata: 2.0, descrizione: "Lago artificiale di 40 km² creato appositamente nel piano urbanistico per garantire umidità alla città nel clima secco del Cerrado.", curiosita: "Lúcio Costa incluse il lago nel piano per abbassare la temperatura della città e creare l'umidità necessaria. Fu un calcolo errato: la città soffre comunque di secchezza estrema, ma il lago è diventato il cuore della vita sociale.", coordinate: { lat: -15.7831, lng: -47.8691 } },
            { id: 5, nome: "Museo Nazionale Honestino Guimarães", categoria: "Museo", durata: 2.0, descrizione: "Edificio a forma di cupola bianca progettato da Niemeyer, ospita mostre d'arte contemporanea brasileira e internazionale.", curiosita: "Niemeyer progettò questo museo a 94 anni come 'regalo alla città'. La cupola bianca è ispirata ai cerrados (pianure) del Brasile centrale, e il riflesso nel lago artificiale crea un cerchio perfetto — un uovo.", coordinate: { lat: -15.7979, lng: -47.8823 } }
          ]
        },

        {
          id: "lima",
          nome: "Lima",
          paese: "Perù",
          lingua: "Spagnolo",
          valuta: "PEN",
          fusoOrario: "UTC-5",
          coordinate: { lat: -12.0464, lng: -77.0428 },
          descrizioneBreve: "Capitale gastronomica dell'America Latina, città che fonde civiltà preinca, coloniale e ultramoderna.",
          poi: [
            { id: 1, nome: "Centro Histórico", categoria: "Storia", durata: 2.0, descrizione: "Patrimonio UNESCO con la Plaza Mayor, la Cattedrale del XVI secolo e le catacombe dei conventi coloniali.", curiosita: "Sotto la Basilica di San Francisco di Lima si trovano 70.000 scheletri nelle catacombe coloniali — i più antichi risalgono al 1600. Le ossa sono disposte in pattern geometrici decorativi dai frati: cerchi, croci, rosoni.", coordinate: { lat: -12.0464, lng: -77.0282 } },
            { id: 2, nome: "Museo Larco", categoria: "Museo", durata: 2.5, descrizione: "Il più importante museo di arte precolombiana al mondo, fondato nel 1926 in un palazzo del XVIII secolo con un orto di cactus.", curiosita: "Il Museo Larco ospita una 'sala erotica' con ceramiche sessuali esplicite delle civiltà Moche (100-800 d.C.). Erano oggetti rituali legati alla fertilità — per secoli i missionari spagnoli tentarono di distruggerle.", coordinate: { lat: -12.0780, lng: -77.0714 } },
            { id: 3, nome: "Miraflores", categoria: "Cultura", durata: 2.0, descrizione: "Il distretto più moderno di Lima, con parchi sulla scogliera, il Parque del Amor e l'eccezionale scena gastronomica.", curiosita: "Lima è riconosciuta come la capitale gastronomica del Sud America. Il ceviche peruviano, a base di pesce crudo marinato nel limone, è patrimonio culturale UNESCO dal 2023. Si prepara in meno di 3 minuti.", coordinate: { lat: -12.1211, lng: -77.0297 } },
            { id: 4, nome: "Huaca Pucllana", categoria: "Storia", durata: 1.5, descrizione: "Piramide a gradoni pre-Inca della civiltà Lima (200-700 d.C.) nel bel mezzo del distretto residenziale moderno.", curiosita: "La piramide è costruita con milioni di mattoni disposti verticalmente 'a libri': una tecnica che la rende resistente ai terremoti dell'area sismica. Ci vollero 500 anni per costruirla.", coordinate: { lat: -12.1106, lng: -77.0339 } },
            { id: 5, nome: "Mercado de Surquillo", categoria: "Gastronomia", durata: 1.0, descrizione: "Il mercato preferito dai grandi chef limeñi: 400 bancarelle con centinaia di varietà di peperoncini, 2.000 tipi di patate e frutti esotici amazzonici.", curiosita: "Il Perù è il paese con più biodiversità gastronomica al mondo: ha 3.500 varietà di patate (il 70% di tutte le varietà mondiali) e 600 tipi di peperoncini. Tutto il mondo mangia peruviano senza saperlo.", coordinate: { lat: -12.1114, lng: -77.0264 } }
          ]
        },

        {
          id: "santiago",
          nome: "Santiago",
          paese: "Cile",
          lingua: "Spagnolo",
          valuta: "CLP",
          fusoOrario: "UTC-3",
          coordinate: { lat: -33.4489, lng: -70.6693 },
          descrizioneBreve: "Capitale cilena ai piedi delle Ande, città moderna con una vivace scena artistica e culturale.",
          poi: [
            { id: 1, nome: "Plaza de Armas", categoria: "Storia", durata: 1.0, descrizione: "Il cuore storico di Santiago dal 1541, circondata dalla Cattedrale Metropolitana e dal Palazzo della Real Audiencia.", curiosita: "Pedro de Valdivia fondò Santiago il 12 febbraio 1541 proprio qui, un mercoledì di Carnevale. La città fu quasi completamente distrutta dagli indigeni Mapuche pochi mesi dopo, ma Valdivia la ricostruì nello stesso punto.", coordinate: { lat: -33.4381, lng: -70.6504 } },
            { id: 2, nome: "Cerro Santa Lucía", categoria: "Natura", durata: 1.5, descrizione: "Collina nel centro della città trasformata nel 1872 in parco romantico dal sindaco Vicuña Mackenna, con terrazze panoramiche.", curiosita: "Il Cerro Santa Lucía fu chiamato 'Huelén' dai Mapuche: luogo di dolore, perché qui avvenne la prima battaglia tra Valdivia e il popolo indigeno. Fu ribattezzato con il nome cristiano per cancellarne la memoria indigena.", coordinate: { lat: -33.4413, lng: -70.6431 } },
            { id: 3, nome: "Barrio Bellavista", categoria: "Arte", durata: 2.0, descrizione: "Il quartiere bohémien di Santiago, con la casa di Pablo Neruda (La Chascona), gallerie d'arte, murales e vita notturna.", curiosita: "Pablo Neruda progettò la sua casa come una nave in tempesta: scale torte, finestre oblique, soffitti bassi. La costruì per la sua amante (poi terza moglie) Matilde Urrutia, nascosta dalla moglie ufficiale del poeta.", coordinate: { lat: -33.4296, lng: -70.6432 } },
            { id: 4, nome: "Museo Chileno de Arte Precolombino", categoria: "Museo", durata: 2.0, descrizione: "Uno dei migliori musei sudamericani dedicato alle civiltà precolombiane andine, con la più grande collezione tessile andina del mondo.", curiosita: "I tessuti Paracas esposti nel museo (200 a.C.) contengono più di 190 colori distinti ottenuti da piante e minerali. La risoluzione delle immagini è comparabile a quella di un monitor moderno: 100 fili per centimetro.", coordinate: { lat: -33.4377, lng: -70.6519 } },
            { id: 5, nome: "Mercado Central", categoria: "Gastronomia", durata: 1.0, descrizione: "Il mercato del pesce di Santiago, costruito in ferro nel 1872, offre i migliori ceviche, mariscos e congrio en caldillo cileno.", curiosita: "La struttura in ferro del Mercado Central fu fabbricata in Inghilterra e spedita in pezzi via nave fino al Cile nel 1872. Fu assemblata come un Lego gigante: nessuna delle travi fu prodotta localmente.", coordinate: { lat: -33.4335, lng: -70.6509 } }
          ]
        },

        {
          id: "buenos_aires",
          nome: "Buenos Aires",
          paese: "Argentina",
          lingua: "Spagnolo",
          valuta: "ARS",
          fusoOrario: "UTC-3",
          coordinate: { lat: -34.6037, lng: -58.3816 },
          descrizioneBreve: "La Parigi del Sud America, capitale del tango, della letteratura e di una cultura europea nel cuore del continente.",
          poi: [
            { id: 1, nome: "La Boca e Caminito", categoria: "Arte", durata: 2.0, descrizione: "Il coloratissimo quartiere degli immigrati genovesi, dove nacque il tango, con case di lamiera dipinte e il tempio del Boca Juniors.", curiosita: "Le case di Caminito erano dipinte con i resti di vernice delle navi del porto. I colori vivaci non erano una scelta estetica: erano letteralmente gli avanzi che i marinai portavano a casa gratis.", coordinate: { lat: -34.6345, lng: -58.3634 } },
            { id: 2, nome: "Teatro Colón", categoria: "Arte", durata: 1.5, descrizione: "Considerato tra i migliori teatri dell'opera al mondo per acustica, inaugurato nel 1908 con capacità di 2.500 spettatori.", curiosita: "Il Teatro Colón impiegò 20 anni per essere costruito (1888-1908) e fu completato da tre diversi architetti. L'acustica è talmente perfetta che uno spillo che cade sul palcoscenico si sente dalle ultime file della galleria.", coordinate: { lat: -34.6010, lng: -58.3832 } },
            { id: 3, nome: "Recoleta e Cementerio de la Recoleta", categoria: "Cultura", durata: 2.0, descrizione: "Il quartiere più elegante di Buenos Aires ospita il famoso cimitero con la tomba di Evita Perón e mausolei neoclassici.", curiosita: "Il Cimitero Recoleta ospita 4.691 mausolei su una superficie di 5,5 ettari. La tomba di Evita Perón è costantemente coperta di fiori freschi; il suo corpo viaggiò per 16 anni tra Europa e America prima di riposare qui.", coordinate: { lat: -34.5879, lng: -58.3935 } },
            { id: 4, nome: "Barrio San Telmo", categoria: "Cultura", durata: 2.0, descrizione: "Il quartiere più antico della città, con il Mercado San Telmo e i ballerini di tango che si esibiscono sulle sue piazze.", curiosita: "San Telmo fu abbandonato dalle famiglie ricche dopo l'epidemia di febbre gialla del 1871, che uccise 14.000 persone. Gli immigrati italiani e spagnoli la ripopolarono: da questa mescolanza nacque il tango.", coordinate: { lat: -34.6188, lng: -58.3726 } },
            { id: 5, nome: "Palermo e Parco Tres de Febrero", categoria: "Natura", durata: 2.5, descrizione: "Il quartiere più verde di Buenos Aires, con laghi artificiali, roseto e il Giardino Giapponese progettato da Sarmiento.", curiosita: "Il Parco Tres de Febrero fu costruito dal presidente Sarmiento nel 1888 sul sito dove sorgeva la residenza del dittatore Rosas. Sarmiento volle che dove c'era tirannia crescessero fiori e alberi.", coordinate: { lat: -34.5717, lng: -58.4153 } }
          ]
        },

        {
          id: "caracas",
          nome: "Caracas",
          paese: "Venezuela",
          lingua: "Spagnolo",
          valuta: "VES",
          fusoOrario: "UTC-4",
          coordinate: { lat: 10.4806, lng: -66.9036 },
          descrizioneBreve: "Capitale del Venezuela, città dinamica incastrata tra il mare e le montagne del Parco El Ávila.",
          poi: [
            { id: 1, nome: "Plaza Bolívar e Centro Histórico", categoria: "Storia", durata: 1.0, descrizione: "Cuore coloniale di Caracas con la statua equestre di Simón Bolívar e la Cattedrale del XVII secolo.", curiosita: "Simón Bolívar nacque a Caracas nel 1783 e liberò sei nazioni (Venezuela, Colombia, Ecuador, Perù, Bolivia e Panama) dalla dominazione spagnola. La Bolivia prese il suo nome in suo onore.", coordinate: { lat: 10.4810, lng: -66.9031 } },
            { id: 2, nome: "Parco Nazionale El Ávila (Waraira Repano)", categoria: "Natura", durata: 3.0, descrizione: "Montagna da 2.765 m alle porte della città, raggiungibile in funivia, con foreste, cascate e vista sull'oceano.", curiosita: "La funivia dell'Ávila (inaugurata nel 2010) è una delle più alte e lunghe del mondo. In cima alla montagna esiste un hotel e persino una pista di pattinaggio sul ghiaccio — a 10° di latitudine dal l'equatore.", coordinate: { lat: 10.5416, lng: -66.8868 } },
            { id: 3, nome: "Museo de Arte Contemporáneo de Caracas", categoria: "Arte", durata: 2.0, descrizione: "Il più importante museo d'arte contemporanea del Venezuela, con opere di Picasso, Miró, Chagall e i grandi maestri venezuelani.", curiosita: "Il museo fu fondato nel 1974 da Sofía Imber, giornalista diventata direttrice senza alcuna formazione museale. Costruì la collezione da zero in vent'anni, ottenendo donazioni di Picasso, Botero e Calder personalmentere.", coordinate: { lat: 10.4881, lng: -66.8938 } },
            { id: 4, nome: "Sabana Grande", categoria: "Cultura", durata: 1.5, descrizione: "Il viale commerciale e culturale di Caracas, boulevard pedonale con librerie, caffè, artigiani e buskers.", curiosita: "Sabana Grande fu il cuore della modernizzazione di Caracas negli anni 1950 quando il Venezuela era il secondo paese più ricco del mondo per reddito pro capite (grazie al petrolio).", coordinate: { lat: 10.4913, lng: -66.8748 } },
            { id: 5, nome: "Catia e Mercado Popular", categoria: "Gastronomia", durata: 1.5, descrizione: "Il mercato popolare di Catia è il cuore gastronomico autentico della città, con arepa makers, empanadas e frutos del país.", curiosita: "L'arepa venezuelana è fatta di masa de maíz (farina di mais precotta) ed è completamente diversa dalla tortilla messicana. Viene consumata 3 volte al giorno da quasi tutti i venezuelani — colazione, pranzo e cena.", coordinate: { lat: 10.5073, lng: -67.0010 } }
          ]
        },

        {
          id: "bogota",
          nome: "Bogotá",
          paese: "Colombia",
          lingua: "Spagnolo",
          valuta: "COP",
          fusoOrario: "UTC-5",
          coordinate: { lat: 4.7110, lng: -74.0721 },
          descrizioneBreve: "Capitale colombiana a 2.600 m sul livello del mare, città in forte rinascita culturale e turistica.",
          poi: [
            { id: 1, nome: "La Candelaria (Centro Histórico)", categoria: "Storia", durata: 2.5, descrizione: "Il centro storico coloniale con chiese barocche, musei e l'Università Nazionale, cuore culturale della capitale.", curiosita: "Bogotá ha la più grande collezione di murales urbani dell'America Latina dopo São Paulo. Dal 2011 il graffiti è legale in tutta la città: il sindaco Petro (poi presidente) firmò l'ordinanza dopo che un writer fu ucciso dalla polizia.", coordinate: { lat: 4.5981, lng: -74.0758 } },
            { id: 2, nome: "Museo del Oro", categoria: "Museo", durata: 2.0, descrizione: "La più grande collezione di oggetti in oro precolombiano al mondo (55.000 pezzi), inclusa la celebre zattera Muisca che ispirò la leggenda di El Dorado.", curiosita: "La leggenda di El Dorado nacque dalla cerimonia Muisca della Laguna di Guatavita: il nuovo re veniva ricoperto d'oro in polvere e si tuffava nel lago. Gli spagnoli passarono secoli a cercare la città d'oro che non esisteva.", coordinate: { lat: 4.6018, lng: -74.0734 } },
            { id: 3, nome: "Monserrate", categoria: "Natura", durata: 2.0, descrizione: "Montagna sacra a 3.152 m con santuario raggiungibile via funivia o teleférico, con vista panoramica su tutta Bogotá.", curiosita: "La chiesa di Monserrate fu costruita nel 1640 e completamente ricostruita dopo i danni del terremoto del 1917. Il Cristo Caído all'interno è meta di pellegrinaggi: i fedeli salgono a piedi ogni domenica anche in altitudine.", coordinate: { lat: 4.6055, lng: -74.0561 } },
            { id: 4, nome: "Museo Botero", categoria: "Arte", durata: 1.5, descrizione: "Casa coloniale nel centro storico che ospita la donazione di Fernando Botero: 123 sue opere e 85 dei grandi maestri europei, ingresso gratuito.", curiosita: "Fernando Botero donò l'intera collezione allo Stato colombiano nel 2000 rifiutando qualsiasi compenso. Disse: 'L'arte appartiene al mio paese'. È il museo più visitato della Colombia.", coordinate: { lat: 4.5985, lng: -74.0760 } },
            { id: 5, nome: "Mercado Paloquemao", categoria: "Gastronomia", durata: 1.0, descrizione: "Il mercato dei fiori e dei frutti tropicali di Bogotá, dove l'abbondanza della Colombia si manifesta in 4.000 tipi di fiori e 200 varietà di frutta.", curiosita: "La Colombia è il secondo esportatore di fiori al mondo dopo l'Olanda. Bogotá si trova a soli 5 gradi dall'equatore: questo permette di coltivare qualsiasi fiore tutto l'anno. Il 70% dei fiori nelle fiorerie europee viene dalla Colombia.", coordinate: { lat: 4.6424, lng: -74.0933 } }
          ]
        }

      ]
    },

    // ══════════════════════════════════════════════════════════
    //  ASIA
    // ══════════════════════════════════════════════════════════
    {
      id: "asia",
      nome: "Asia",
      citta: [

        {
          id: "tokyo",
          nome: "Tokyo",
          paese: "Giappone",
          lingua: "Giapponese",
          valuta: "JPY",
          fusoOrario: "UTC+9",
          coordinate: { lat: 35.6762, lng: 139.6503 },
          descrizioneBreve: "La metropoli più popolosa del mondo, dove tecnologia futuristica e tradizione millenaria coesistono.",
          poi: [
            { id: 1, nome: "Tempio Senso-ji (Asakusa)", categoria: "Storia", durata: 1.5, descrizione: "Il tempio buddhista più antico di Tokyo (645 d.C.), con la Kaminarimon (Porta del Tuono) e il mercatino Nakamise.", curiosita: "Secondo la leggenda, il Senso-ji fu fondato dopo che due pescatori trovarono nelle reti una statua della dea Kannon. Il tempio fu costruito per custodirla. La statua è talmente sacra che non è mai stata esposta al pubblico — nemmeno oggi.", coordinate: { lat: 35.7148, lng: 139.7967 } },
            { id: 2, nome: "Shibuya Crossing e Quartiere", categoria: "Cultura", durata: 1.0, descrizione: "L'incrocio pedonale più trafficato del mondo: fino a 3.000 persone attraversano contemporaneamente ad ogni verde.", curiosita: "Shibuya Crossing appare in decine di film hollywoodiani come simbolo del Giappone moderno. L'incrocio è così efficiente che in 1 minuto di rosso si accumulano più persone che nell'intera Times Square di New York.", coordinate: { lat: 35.6595, lng: 139.7005 } },
            { id: 3, nome: "Palazzo Imperiale e Giardini", categoria: "Storia", durata: 2.0, descrizione: "Residenza dell'Imperatore del Giappone nel cuore di Tokyo, con i Giardini Orientali aperti al pubblico.", curiosita: "Il terreno del Palazzo Imperiale è il più costoso al mondo per metro quadro: negli anni '80 il suo valore stimato superava quello dell'intero stato della California. I giardini esterni sono visitabili, ma il palazzo rimane una delle residenze più riservate al mondo.", coordinate: { lat: 35.6852, lng: 139.7528 } },
            { id: 4, nome: "Akihabara", categoria: "Cultura", durata: 2.0, descrizione: "Il distretto dell'elettronica e dell'anime, da quartiere dei radioamatori del dopoguerra a capitale mondiale della cultura otaku.", curiosita: "Dopo la Seconda Guerra Mondiale, i soldati americani vendevano componenti radio surplus in questo quartiere. Da quel mercato clandestino di pezzi di ricambio nacque l'Akihabara che conosciamo oggi.", coordinate: { lat: 35.7023, lng: 139.7745 } },
            { id: 5, nome: "TeamLab Planets (Toyosu)", categoria: "Arte", durata: 1.5, descrizione: "Il museo d'arte digitale immersivo più innovativo di Tokyo, dove ambienti interattivi di luce e acqua avvolgono completamente il visitatore.", curiosita: "TeamLab è un collettivo di artisti digitali giapponesi fondato nel 2001. I loro musei rifiutano il concetto di 'opera da guardare': ogni visitatore diventa parte dell'opera, cambiandola con la propria presenza.", coordinate: { lat: 35.6490, lng: 139.7869 } }
          ]
        },

        {
          id: "mosca",
          nome: "Mosca",
          paese: "Russia",
          lingua: "Russo",
          valuta: "RUB",
          fusoOrario: "UTC+3",
          coordinate: { lat: 55.7558, lng: 37.6173 },
          descrizioneBreve: "Capitale russa, metropoli di 12 milioni di abitanti con il Cremlino, la Piazza Rossa e la metro-museo.",
          poi: [
            { id: 1, nome: "Piazza Rossa e Cremlino", categoria: "Storia", durata: 3.0, descrizione: "Il cuore di Mosca e della Russia: la fortezza medievale del Cremlino e la piazza più famosa del paese si fronteggiano da secoli.", curiosita: "Il termine 'cremlino' (kreml) in russo significa semplicemente 'fortezza'. Quasi tutte le città russe hanno il loro cremlino — quello di Mosca è solo il più famoso. Il muro ha 20 torri, ognuna con un nome diverso.", coordinate: { lat: 55.7520, lng: 37.6175 } },
            { id: 2, nome: "Cattedrale di San Basilio", categoria: "Architettura", durata: 1.0, descrizione: "L'icona di Mosca per eccellenza: nove cupole a cipolla policromate, completata nel 1561 per celebrare la vittoria su Kazan.", curiosita: "La leggenda vuole che Ivan il Terribile abbia fatto accecare l'architetto Postnik Yakovlev dopo la costruzione per impedirgli di replicarla altrove. Lo storico però è un mito: i documenti mostrano che Yakovlev costruì altri edifici dopo.", coordinate: { lat: 55.7525, lng: 37.6231 } },
            { id: 3, nome: "Galleria Tretyakov", categoria: "Museo", durata: 2.5, descrizione: "La più grande collezione di arte russa al mondo, fondata da Pavel Tretyakov nel 1856 con oltre 180.000 opere.", curiosita: "Pavel Tretyakov era un mercante tessile che spese l'intera sua fortuna ad acquistare arte russa. Nel 1892 donò tutto alla città di Mosca. Disse: 'Non ho figli — il popolo russo è mio figlio'.", coordinate: { lat: 55.7414, lng: 37.6208 } },
            { id: 4, nome: "Metro di Mosca", categoria: "Architettura", durata: 1.5, descrizione: "Il sistema metropolitano staliniano con stazioni decorate come palazzi: marmi, mosaici, lampadari di cristallo e sculture bronzee.", curiosita: "La stazione Komsomolskaya è considerata la più bella metro del mondo, con il soffitto a mosaico che celebra le vittorie militari russe. Stalin voleva che i lavoratori avessero palazzi sotterranei da cui emergere verso le baracche di superficie.", coordinate: { lat: 55.7558, lng: 37.6173 } },
            { id: 5, nome: "Mercato Izmailovo e Cremlino di Izmailovo", categoria: "Cultura", durata: 2.0, descrizione: "Il più grande mercato delle pulci di Mosca con artigianato russo, matrioske, uniformi sovietiche e icone religiose.", curiosita: "Il Cremlino di Izmailovo è un falso costruito negli anni 2000 come parco tematico, ma i turisti lo scambiano spesso per quello vero. I russi ne sono divertiti: 'Abbiamo due Cremlini, i turisti fotografano quello sbagliato'.", coordinate: { lat: 55.7895, lng: 37.7501 } }
          ]
        },

        {
          id: "beijing",
          nome: "Pechino",
          paese: "Cina",
          lingua: "Cinese Mandarino",
          valuta: "CNY",
          fusoOrario: "UTC+8",
          coordinate: { lat: 39.9042, lng: 116.4074 },
          descrizioneBreve: "Capitale cinese millenaria, dove la Città Proibita e la Grande Muraglia convivono con una modernità spettacolare.",
          poi: [
            { id: 1, nome: "Città Proibita (Gugong)", categoria: "Storia", durata: 3.0, descrizione: "Il palazzo imperiale più grande al mondo: 980 edifici e 9.999 stanze, residenza di 24 imperatori per 500 anni.", curiosita: "Il numero 9.999 non è casuale: 10.000 (wan) era considerato il numero della perfezione assoluta — riservato solo al Cielo. L'imperatore, pur supremo, aveva un palazzo con una stanza in meno del paradiso.", coordinate: { lat: 39.9163, lng: 116.3972 } },
            { id: 2, nome: "Grande Muraglia (sezione Mutianyu)", categoria: "Storia", durata: 4.0, descrizione: "La struttura architettonica più estesa della storia umana: 21.000 km di mura tra torri di guardia e passaggi segreti.", curiosita: "La Grande Muraglia non è visibile dallo spazio a occhio nudo — è uno dei miti più duri da sfatare. Il cosmonauta cinese Yang Liwei lo confermò nel 2003. La muraglia è larga circa 5 metri: troppo sottile per essere vista dall'orbita.", coordinate: { lat: 40.4319, lng: 116.5704 } },
            { id: 3, nome: "Tempio del Cielo (Tiantan)", categoria: "Storia", durata: 2.0, descrizione: "Complesso templare del XV secolo dove l'imperatore pregava per i raccolti: la Hall of Prayer è il simbolo architettonico della Cina.", curiosita: "L'intera struttura del Tempio del Cielo è costruita senza un solo chiodo in ferro: è tenuta insieme da un sistema di incastri in legno (dougong). Resiste ai terremoti da 600 anni.", coordinate: { lat: 39.8822, lng: 116.4066 } },
            { id: 4, nome: "Hutong di Nanluoguxiang", categoria: "Cultura", durata: 2.0, descrizione: "I vicoli tradizionali di Pechino rimasti intatti tra i grattacieli moderni, con corti residenziali (siheyuan) del periodo Ming.", curiosita: "Il termine hutong deriva dal mongolo 'hottog' (pozzo): i vicoli si formarono attorno ai pozzi d'acqua nella Pechino mongola del XIII secolo. Sopravvivono solo il 12% degli hutong originali — il resto fu demolito negli anni '90.", coordinate: { lat: 39.9302, lng: 116.4040 } },
            { id: 5, nome: "Piazza Tienanmen", categoria: "Storia", durata: 1.0, descrizione: "La piazza più grande del mondo (440.000 mq), con il Mausoleo di Mao Zedong e la Porta della Pace Celeste.", curiosita: "Il ritratto di Mao appeso alla Porta della Pace Celeste è ridipinto ogni anno su tela con colori stesi a mano. Il pittore Ge Xiaoguang ha il contratto esclusivo da decenni: è il custode ufficiale del volto di Mao.", coordinate: { lat: 39.9055, lng: 116.3977 } }
          ]
        },

        {
          id: "seoul",
          nome: "Seoul",
          paese: "Corea del Sud",
          lingua: "Coreano",
          valuta: "KRW",
          fusoOrario: "UTC+9",
          coordinate: { lat: 37.5665, lng: 126.9780 },
          descrizioneBreve: "Capitale sudcoreana ultra-tecnologica che ha saputo preservare palazzi Joseon e tradizioni millenarie.",
          poi: [
            { id: 1, nome: "Palazzo Gyeongbokgung", categoria: "Storia", durata: 2.0, descrizione: "Il principale palazzo della dinastia Joseon (1392-1910), con 330 edifici originali restaurati e cambio della guardia in costume d'epoca.", curiosita: "Il palazzo fu completamente distrutto durante l'occupazione giapponese (1910-1945): i giapponesi costruirono il palazzo del Governo coloniale esattamente davanti all'ingresso per simboleggiare la dominazione. Dopo il 1945 fu demolito e il palazzo restaurato.", coordinate: { lat: 37.5796, lng: 126.9770 } },
            { id: 2, nome: "Bukchon Hanok Village", categoria: "Cultura", durata: 1.5, descrizione: "Quartiere storico con 900 case tradizionali hanok (tetti curvi in tegole grigie) a pochi metri dai grattacieli di Gangnam.", curiosita: "Le case hanok sono progettate per funzionare senza aria condizionata: d'estate il tetto sporge per bloccare il sole, d'inverno il sole basso entra e scalda il pavimento. Il sistema di riscaldamento 'ondol' (calore dal pavimento) ha 5.000 anni.", coordinate: { lat: 37.5826, lng: 126.9840 } },
            { id: 3, nome: "Mercato di Gwangjang", categoria: "Gastronomia", durata: 1.5, descrizione: "Il mercato coperto più antico di Corea (1905) famoso per bindaetteok (frittelle di fagioli mung), mayak gimbap e pajeon.", curiosita: "Il Gwangjang Market fu fondato da commercianti coreani nel 1905 come atto di resistenza al monopolio commerciale giapponese. Fu il primo mercato gestito interamente da capitali coreani: un atto politico mascherato da commercio.", coordinate: { lat: 37.5700, lng: 126.9997 } },
            { id: 4, nome: "N Seoul Tower (Namsan)", categoria: "Architettura", durata: 1.5, descrizione: "Torre di 480 m sul monte Namsan con le 'lucchetti dell'amore' sulle terrazze panoramiche e vista a 360° sulla megalopoli.", curiosita: "I 'lucchetti dell'amore' sul N Seoul Tower sono diventati un fenomeno globale ma nacquero qui: coppie che incidono i nomi su un lucchetto e lo appendono al recinto simboleggiano un amore eterno. Ogni anno migliaia di lucchetti vengono rimossi per motivi strutturali.", coordinate: { lat: 37.5512, lng: 126.9882 } },
            { id: 5, nome: "Zona Demilitarizzata (DMZ)", categoria: "Storia", durata: 3.0, descrizione: "La frontiera più militarizzata del mondo a 50 km da Seoul: visite guidate portano alla Joint Security Area dove Nord e Sud si fronteggiano.", curiosita: "La DMZ larga 4 km è paradossalmente diventata una delle più grandi riserve naturali d'Asia: nessun essere umano l'ha attraversata per 70 anni, e fauna selvatica rarissima come la gru siberiana ci ha trovato rifugio.", coordinate: { lat: 37.9337, lng: 126.6583 } }
          ]
        },

        {
          id: "taipei",
          nome: "Taipei",
          paese: "Taiwan",
          lingua: "Cinese Mandarino",
          valuta: "TWD",
          fusoOrario: "UTC+8",
          coordinate: { lat: 25.0330, lng: 121.5654 },
          descrizioneBreve: "Capitale taiwanese, città di notte vivace, templi antichi e il grattacielo-bambù Taipei 101.",
          poi: [
            { id: 1, nome: "Taipei 101", categoria: "Architettura", durata: 2.0, descrizione: "Il grattacielo a forma di fusto di bambù da 508 m è stato l'edificio più alto del mondo dal 2004 al 2010, con l'ascensore più veloce.", curiosita: "Il Taipei 101 ha al suo interno una sfera d'acciaio da 660 tonnellate sospesa tra il 87° e il 92° piano: è un smorzatore di massa che riduce l'oscillazione durante tifoni e terremoti. Visibile dall'interno, è diventata un'attrazione turistica.", coordinate: { lat: 25.0338, lng: 121.5645 } },
            { id: 2, nome: "Mercato Notturno di Shilin", categoria: "Gastronomia", durata: 2.0, descrizione: "Il mercato notturno più grande e famoso di Taiwan, con il pollo fritto gigante (XXL Chicken), bubble tea e centinaia di street food.", curiosita: "Taiwan ha inventato il bubble tea (珍珠奶茶) nel 1986 a Tainan. La bevanda con palline di tapioca ha generato un mercato globale da 3 miliardi di dollari l'anno. Il brevetto non fu depositato: il creatore non pensava potesse diffondersi così.", coordinate: { lat: 25.0881, lng: 121.5241 } },
            { id: 3, nome: "Tempio Longshan (Wanhua)", categoria: "Storia", durata: 1.0, descrizione: "Il tempio buddhista-taoista più venerato di Taipei (1738), con un'architettura mozzafiato di draghi, fenici e migliaia di lanterne rosse.", curiosita: "Durante la Seconda Guerra Mondiale una bomba americana colpì il tempio distruggendo il tetto. Gli uomini che pregavano all'interno sopravvissero tutti. Da allora il tempio è considerato miracoloso e le code per accedervi sono sempre lunghissime.", coordinate: { lat: 25.0368, lng: 121.4999 } },
            { id: 4, nome: "Museo Nazionale del Palazzo", categoria: "Museo", durata: 3.0, descrizione: "Una delle collezioni d'arte cinese più ricche al mondo, con 700.000 oggetti tra cui giade, bronzi e dipinti dell'imperatore Song.", curiosita: "La collezione fu evacuata dalla Città Proibita di Pechino nel 1933 per salvarla dall'invasione giapponese. Dopo la guerra civile cinese fu portata a Taiwan nel 1949. La Cina continentale ne chiede ancora la restituzione.", coordinate: { lat: 25.1023, lng: 121.5484 } },
            { id: 5, nome: "Jiufen", categoria: "Cultura", durata: 3.0, descrizione: "Villaggio di montagna sul mare con scalinate di lanterne rosse, teahouse d'epoca e panorami sul Pacifico — modello per il film La Città Incantata.", curiosita: "Jiufen ispirò visivamente Hayao Miyazaki per La Città Incantata (2001). Miyazaki ha sempre negato ufficialmente il riferimento, ma i turisti giapponesi si recano qui portando il poster del film. Il comune ha persino installato la musica del film nelle strade.", coordinate: { lat: 25.1089, lng: 121.8441 } }
          ]
        },

        {
          id: "bangkok",
          nome: "Bangkok",
          paese: "Thailandia",
          lingua: "Tailandese",
          valuta: "THB",
          fusoOrario: "UTC+7",
          coordinate: { lat: 13.7563, lng: 100.5018 },
          descrizioneBreve: "Capitale thailandese caotica e affascinante, con templi dorati, canali e street food tra i migliori al mondo.",
          poi: [
            { id: 1, nome: "Wat Phra Kaew (Tempio del Buddha di Smeraldo)", categoria: "Storia", durata: 2.0, descrizione: "Il tempio più sacro della Thailandia, all'interno del complesso del Grande Palazzo Reale, custodisce il Buddha di Smeraldo.", curiosita: "Il Buddha di Smeraldo, alto solo 66 cm, è il palladio (oggetto sacro protettore) della Thailandia. Non è di smeraldo ma di giadeite. Il Re si reca personalmente al tempio tre volte l'anno per cambiare il costume alla statua secondo le stagioni.", coordinate: { lat: 13.7516, lng: 100.4927 } },
            { id: 2, nome: "Wat Arun (Tempio dell'Alba)", categoria: "Architettura", durata: 1.5, descrizione: "La torre centrale prang alta 79 m decorata con milioni di frammenti di porcellana cinese, magnifica all'alba e al tramonto.", curiosita: "Le porcellane che decorano il Wat Arun provengono da cocci di piatti rotti importati dalla Cina. Nel XIX secolo le navi commerciali usavano porcellane come zavorra: quando arrivavano a Bangkok venivano rotte e usate per decorare i templi.", coordinate: { lat: 13.7440, lng: 100.4888 } },
            { id: 3, nome: "Mercato Galleggiante di Damnoen Saduak", categoria: "Cultura", durata: 2.0, descrizione: "Il mercato galleggiante più fotografato al mondo (100 km da Bangkok), con centinaia di barche cariche di frutta, spezie e cibo tipico.", curiosita: "I mercati galleggianti tailandesi erano la principale forma di commercio fino agli anni '70. Quando il governo costruì strade, i mercati scomparvero. Quello di Damnoen Saduak sopravvisse e divenne un'attrazione turistica: oggi vende principalmente ai turisti, non agli abitanti.", coordinate: { lat: 13.5194, lng: 99.9595 } },
            { id: 4, nome: "Khao San Road", categoria: "Cultura", durata: 1.5, descrizione: "La via più famosa del turismo backpacker asiatico: bar, hostel, street food, massaggi e un'energia caotica unica.", curiosita: "Khao San Road significa letteralmente 'via del riso non cotto': era il mercato del riso di Bangkok prima di diventare la strada dei viaggiatori. La trasformazione avvenne negli anni '80 dopo la pubblicazione di The Beach di Alex Garland.", coordinate: { lat: 13.7600, lng: 100.4977 } },
            { id: 5, nome: "Mercato Chatuchak", categoria: "Gastronomia", durata: 2.0, descrizione: "Il più grande mercato del weekend al mondo: 15.000 bancarelle su 35 ettari con tutto ciò che esiste — dal cibo agli animali esotici.", curiosita: "Il Chatuchak copre 35 ettari e attira 200.000 visitatori ogni weekend. È talmente grande che il mercato distribuisce mappe cartacee: ci sono persone che ci vanno ogni settimana da anni e scoprono ancora corridoi sconosciuti.", coordinate: { lat: 13.7999, lng: 100.5500 } }
          ]
        }

      ]
    },

    // ══════════════════════════════════════════════════════════
    //  OCEANIA
    // ══════════════════════════════════════════════════════════
    {
      id: "oceania",
      nome: "Oceania",
      citta: [

        {
          id: "canberra",
          nome: "Canberra",
          paese: "Australia",
          lingua: "Inglese",
          valuta: "AUD",
          fusoOrario: "UTC+10",
          coordinate: { lat: -35.2809, lng: 149.1300 },
          descrizioneBreve: "La capitale pianificata dell'Australia, città-giardino nata da un compromesso tra Sydney e Melbourne.",
          poi: [
            { id: 1, nome: "Parlamento Australiano (Parliament House)", categoria: "Architettura", durata: 2.0, descrizione: "Inaugurato nel 1988 per il bicentenario dell'Australia, è costruito nella collina: il verde del tetto è in realtà il prato che ci si può camminare sopra.", curiosita: "Il progetto fu vinto da uno studio americano (Mitchell/Giurgola) che batté 329 concorrenti da tutto il mondo. La bandiera australiana sul tetto è larga quanto un autobus: se cadesse di piatto sui parlamentari li schiaccherebbe.", coordinate: { lat: -35.3075, lng: 149.1244 } },
            { id: 2, nome: "Australian War Memorial", categoria: "Museo", durata: 2.5, descrizione: "Il più importante memoriale e museo militare dell'Australia, combinazione unica di santuario e archivio storico dei conflitti in cui ha partecipato.", curiosita: "Il War Memorial fu costruito dopo la Prima Guerra Mondiale dal veterano Charles Bean, che seguì le truppe sul campo documentando ogni battaglia. Insistette che il memoriale dovesse guardare verso il Parlamento: i politici non devono dimenticare il costo delle loro decisioni.", coordinate: { lat: -35.2803, lng: 149.1516 } },
            { id: 3, nome: "Museo Nazionale d'Australia", categoria: "Museo", durata: 2.0, descrizione: "Il museo principale della storia australiana, sulle rive del Lago Burley Griffin, con la storia indigena e coloniale del continente.", curiosita: "Il museum è costruito con frammenti di pavimentazione originale del vecchio Parlamento Australiano. Riutilizzare i mattoni storici nell'edificio nuovo è una metafora voluta: la storia si costruisce sopra la storia.", coordinate: { lat: -35.2931, lng: 149.1314 } },
            { id: 4, nome: "Lago Burley Griffin", categoria: "Natura", durata: 1.5, descrizione: "Lago artificiale al centro di Canberra progettato da Walter Burley Griffin nel 1963, cuore dell'architettura urbanistica della città.", curiosita: "Il lago fu riempito solo nel 1964 — Canberra esisteva già da 51 anni senza il suo lago centrale. Prima era solo il fiume Molonglo. Griffin lo aveva previsto nel progetto originale del 1913 ma i fondi non c'erano.", coordinate: { lat: -35.2935, lng: 149.1272 } },
            { id: 5, nome: "Questacon (Science and Technology Centre)", categoria: "Cultura", durata: 2.0, descrizione: "Il museo interattivo di scienza e tecnologia più famoso dell'Australia, con oltre 200 esibizioni hands-on su fisica, biologia e ingegneria.", curiosita: "Questacon ha una sezione dedicata ai disastri naturali con un simulatore di terremoto: i visitatori possono sperimentare la forza di un terremoto di magnitudo 5. È diventato paradossalmente più popolare dopo i veri terremoti nella regione.", coordinate: { lat: -35.2951, lng: 149.1289 } }
          ]
        },

        {
          id: "wellington",
          nome: "Wellington",
          paese: "Nuova Zelanda",
          lingua: "Inglese / Maori",
          valuta: "NZD",
          fusoOrario: "UTC+12",
          coordinate: { lat: -41.2866, lng: 174.7756 },
          descrizioneBreve: "La capitale più meridionale del mondo, città del vento con una scena culturale e gastronomica sorprendente.",
          poi: [
            { id: 1, nome: "Museo Te Papa Tongarewa", categoria: "Museo", durata: 3.0, descrizione: "Il museo nazionale della Nuova Zelanda racconta la storia naturale del paese e la cultura Maori con installazioni immersive.", curiosita: "Te Papa significa 'contenitore di tesori' in Maori. Il museo ospita un esemplare di calamaro gigante (Mesonychoteuthis hamiltoni) di 4,2 metri: il più grande mai catturato. È tenuto in un congelatore speciale aperto al pubblico.", coordinate: { lat: -41.2904, lng: 174.7812 } },
            { id: 2, nome: "Monte Victoria", categoria: "Natura", durata: 1.5, descrizione: "Il punto panoramico più popolare di Wellington, a 196 m sul livello del mare, con vista sullo stretto di Cook e sull'isola del Nord.", curiosita: "Il Monte Victoria apparve nel film Il Signore degli Anelli (2001): la scena in cui i Hobbit si nascondono dalla Nazgul fu girata qui. Wellington è la città di Peter Jackson: il 40% della produzione cinematografica neozelandese avviene nel raggio di 30 km da questo monte.", coordinate: { lat: -41.2944, lng: 174.7943 } },
            { id: 3, nome: "Cuba Street", categoria: "Cultura", durata: 1.5, descrizione: "La strada bohémien di Wellington con caffè indipendenti, murales, negozietti vintage e il bucato meccanico vivente (Bucket Fountain).", curiosita: "La Bucket Fountain di Cuba Street (1969) è una delle sculture più odiate e amate della Nuova Zelanda: secchi che si riempiono e rovesciano in modo caotico. Ogni volta che è stata proposta la sua rimozione, i wellingtoniani hanno protestato in massa.", coordinate: { lat: -41.2921, lng: 174.7748 } },
            { id: 4, nome: "Zealandia (Santuario Ecosistemico)", categoria: "Natura", durata: 2.5, descrizione: "Il primo recinto urbano a recinzione anti-predatori al mondo, 225 ettari nel cuore della città con specie come il tuatara e il kaka.", curiosita: "Il Tuatara ospitato a Zealandia è il rettile vivente più antico del mondo: la sua linea evolutiva è rimasta quasi immutata per 200 milioni di anni. È sopravvissuto all'estinzione dei dinosauri ma rischiò l'estinzione per i ratti portati dagli europei.", coordinate: { lat: -41.3003, lng: 174.7513 } },
            { id: 5, nome: "Parlamento della Nuova Zelanda (The Beehive)", categoria: "Architettura", durata: 1.0, descrizione: "Il caratteristico edificio a forma di alveare (1977) ospita gli uffici esecutivi del governo neozelandese accanto al vecchio Parlamento gotico.", curiosita: "La Nuova Zelanda fu il primo paese al mondo a concedere il voto alle donne, nel 1893. Il Parlamento ha una percentuale di donne parlamentari tra le più alte del mondo. L'edificio Beehive fu progettato dal britannico Basil Spence su un tovagliolo di ristorante durante una cena ufficiale.", coordinate: { lat: -41.2784, lng: 174.7767 } }
          ]
        },

        {
          id: "suva",
          nome: "Suva",
          paese: "Figi",
          lingua: "Inglese / Figiano / Hindi",
          valuta: "FJD",
          fusoOrario: "UTC+12",
          coordinate: { lat: -18.1248, lng: 178.4501 },
          descrizioneBreve: "La capitale delle Figi, città portuale che unisce eredità coloniale britannica e cultura melanesiana vivace.",
          poi: [
            { id: 1, nome: "Museo delle Figi", categoria: "Museo", durata: 2.0, descrizione: "Il principale museo delle Isole Figi, ospita i resti della zattera di Ratu Cakobau e collezioni di arte tradizionale melanesiana.", curiosita: "Il museo custodisce il cannibale's fork (forchetta del cannibale) usato dal Reverendo Thomas Baker, il missionario ucciso e mangiato nel 1867. Nel 2003 il villaggio responsabile si scusò ufficialmente con i discendenti del missionario in una cerimonia di perdono tradizionale.", coordinate: { lat: -18.1415, lng: 178.4416 } },
            { id: 2, nome: "Mercato di Suva (Suva Municipal Market)", categoria: "Gastronomia", durata: 1.5, descrizione: "Il più grande mercato delle Figi con kava (la bevanda cerimoniale), cassava, taro, frutti tropicali e artigianato figiano.", curiosita: "La Kava (yaqona) è la bevanda nazionale delle Figi: radice di pepe macinata e mescolata con acqua. Ha effetti leggermente sedativi. Le cerimonie kava regolano ogni incontro formale nelle isole — dai matrimoni alle trattative d'affari.", coordinate: { lat: -18.1404, lng: 178.4412 } },
            { id: 3, nome: "Cattedrale del Sacro Cuore", categoria: "Architettura", durata: 0.5, descrizione: "La cattedrale cattolica di Suva del 1902, piccolo gioiello coloniale con vetrate importate dall'Inghilterra e panche in legno di villo.", curiosita: "La cattedrale fu costruita in un'epoca in cui i missionari cattolici competevano con i metodisti per la conversione dei figiani. I metodisti arrivarono prima (1835) e ancora oggi il 55% della popolazione figiana è metodista.", coordinate: { lat: -18.1388, lng: 178.4440 } },
            { id: 4, nome: "Colo-i-Suva Forest Park", categoria: "Natura", durata: 2.0, descrizione: "Foresta tropicale pluviale a 9 km da Suva con cascate, pozze naturali per il nuoto e uccelli rari come il pappagallo figiano.", curiosita: "Le Figi sono uno degli ultimi rifugi del Kula (pappagallo figiano) con le piume rosse. Considerato sacro dalle popolazioni tradizionali, le sue piume erano usate per i copricapi dei capi. Il commercio illegale ne ha ridotto la popolazione.", coordinate: { lat: -18.0777, lng: 178.4639 } },
            { id: 5, nome: "Thurston Gardens", categoria: "Natura", durata: 1.0, descrizione: "Il giardino botanico coloniale fondato nel 1880, con centinaia di specie tropicali e la statua del governatore Sir John Thurston.", curiosita: "I Thurston Gardens furono fondati come laboratorio botanico per acclimatare piante da tutto l'Impero Britannico. La canna da zucchero fu testata qui prima di diventare la principale coltura delle Figi — e la ragione per cui migliaia di indiani furono portati come lavoratori indentured.", coordinate: { lat: -18.1425, lng: 178.4387 } }
          ]
        },

        {
          id: "majuro",
          nome: "Majuro",
          paese: "Isole Marshall",
          lingua: "Marshallese / Inglese",
          valuta: "USD",
          fusoOrario: "UTC+12",
          coordinate: { lat: 7.0897, lng: 171.3803 },
          descrizioneBreve: "Capitale delle Isole Marshall, atollo corallino minacciato dal cambiamento climatico a soli 2 metri sul livello del mare.",
          poi: [
            { id: 1, nome: "Museo delle Isole Marshall (Alele Museum)", categoria: "Museo", durata: 1.5, descrizione: "L'unico museo delle Marshall Islands con cimeli della Seconda Guerra Mondiale, mappe di navigazione a bastoncini di bambù e artigianato tradizionale.", curiosita: "Le mappe a bastoncini (rebbelib) dei navigatori marshallesi sono una delle invenzioni nautiche più ingegnose della storia: indicavano le correnti oceaniche e le onde riflesse dalle isole — un sistema di navigazione senza bussola né stelle.", coordinate: { lat: 7.1167, lng: 171.3801 } },
            { id: 2, nome: "Spiagge dell'Atollo di Majuro", categoria: "Natura", durata: 2.0, descrizione: "Le spiagge bianche di sabbia corallina dell'atollo, con acque turchesi e reef tra i più preservati del Pacifico.", curiosita: "Majuro è minacciata dall'innalzamento del livello del mare: si trova a soli 2 metri sul livello del mare. La nazione è già in trattativa con Nuova Zelanda, Australia e Fiji per una 'migrazione pianificata' dell'intera popolazione.", coordinate: { lat: 7.0897, lng: 171.3803 } },
            { id: 3, nome: "Mercato Locale DUD (Delap-Uliga-Djarrit)", categoria: "Gastronomia", durata: 1.0, descrizione: "Il mercato alimentare del centro urbano di Majuro con pesce fresco, frutta del pane (breadfruit) e cibi in stile micronesiano.", curiosita: "Il breadfruit (frutto del pane) fu al centro di uno dei motini navali più famosi della storia: il Bounty fu inviato a Tahiti nel 1789 proprio per raccogliere piantine di breadfruit da portare nelle Indie Occidentali. Il motino scoppiò durante il viaggio di ritorno.", coordinate: { lat: 7.1043, lng: 171.3766 } },
            { id: 4, nome: "Isola di Laura", categoria: "Natura", durata: 1.5, descrizione: "L'estremità occidentale dell'atollo di Majuro, zona più selvaggia con spiagge semi-deserte e foresta di cocco.", curiosita: "Laura ha la migliore spiaggia delle Marshall ed è considerata 'l'ultima spiaggia' del cambiamento climatico: si prevede che diventi inabitabile entro il 2050 per le maree eccezionali. I residenti la visitano come chi visita un posto che sta per scomparire.", coordinate: { lat: 7.0615, lng: 171.0803 } },
            { id: 5, nome: "Relitti della Seconda Guerra Mondiale", categoria: "Storia", durata: 2.5, descrizione: "Il lagoon di Majuro ospita relitti di navi e aerei della Seconda Guerra Mondiale accessibili con snorkeling, testimonianze silenziose dell'operazione Flintlock del 1944.", curiosita: "Le Marshall furono il teatro di alcune delle battaglie navali più dure del Pacifico nel 1944. I giapponesi avevano trasformato ogni atollo in una fortezza sotterranea. Il lagoon di Majuro fu la prima grande base avanzata della Marina USA dopo la conquista.", coordinate: { lat: 7.0897, lng: 171.3803 } }
          ]
        },

        {
          id: "port_vila",
          nome: "Port Vila",
          paese: "Vanuatu",
          lingua: "Bislama / Inglese / Francese",
          valuta: "VUV",
          fusoOrario: "UTC+11",
          coordinate: { lat: -17.7334, lng: 168.3219 },
          descrizioneBreve: "Capitale di Vanuatu, piccolo paradiso tropicale con vulcani attivi, cascate e cultura kustom melanesiana.",
          poi: [
            { id: 1, nome: "Mercato Centrale di Port Vila", categoria: "Gastronomia", durata: 1.5, descrizione: "Il mercato coloratissimo del cuore della capitale con kava, lapLap (piatto nazionale), spezie esotiche e tessuti tradizionali.", curiosita: "Il lapLap, piatto nazionale di Vanuatu, è cotto avvolgendo radici di taro o manioca grattugiate nelle foglie di banano e interrandolo con pietre calde. La tecnica di cottura in terra è rimasta invariata da 3.000 anni.", coordinate: { lat: -17.7334, lng: 168.3219 } },
            { id: 2, nome: "Cascate di Mele (Cascades)", categoria: "Natura", durata: 2.0, descrizione: "Serie di cascate a gradoni circondate da foresta tropicale raggiungibili a piedi da Port Vila, con pozze naturali balneabili.", curiosita: "Le cascate di Mele hanno una particolarità: i gradini su cui si cammina per risalirle sono calcare naturale modellato dall'acqua in millenni. Camminare su di esse è letteralmente camminare su travertino vivo che si forma davanti ai vostri occhi.", coordinate: { lat: -17.7746, lng: 168.3268 } },
            { id: 3, nome: "Museo Culturale di Vanuatu", categoria: "Museo", durata: 1.5, descrizione: "Il museo nazionale raccoglie oltre 3.000 artefatti delle 80 culture di Vanuatu, comprese le statue slit-drum e i gradi cerimoniali.", curiosita: "Vanuatu ha 83 isole abitate e 113 lingue distinte (non dialetti: lingue). È il paese con la più alta densità linguistica al mondo per abitante. Il Bislama, la lingua franca creola, è nata dalle piantagioni coloniali dove parlanti di lingue diverse dovevano comunicare.", coordinate: { lat: -17.7365, lng: 168.3215 } },
            { id: 4, nome: "Eton Beach", categoria: "Natura", durata: 1.5, descrizione: "La spiaggia più bella dell'isola di Efate, con sabbia bianca e barriera corallina accessibile senza attrezzatura per lo snorkeling.", curiosita: "Vanuatu fu classificato come il paese più felice al mondo dall'Happy Planet Index nel 2006. Le popolazioni locali vivono di sussistenza, non di consumi: bassissima impronta ecologica e altissima soddisfazione soggettiva.", coordinate: { lat: -17.6416, lng: 168.4393 } },
            { id: 5, nome: "Vulcano Yasur (Isola di Tanna)", categoria: "Natura", durata: 4.0, descrizione: "Uno dei vulcani più accessibili al mondo: si cammina fino al bordo del cratere e si osservano le eruzioni ogni pochi minuti, di giorno o di notte.", curiosita: "Il Yasur erutta continuamente da oltre 800 anni, rendendolo il vulcano in attività continua da più tempo al mondo documentato da europei. Il Capitano Cook lo descrisse nel 1774 come 'una lanterna accesa nel buio del Pacifico'.", coordinate: { lat: -19.5285, lng: 169.4422 } }
          ]
        },

        {
          id: "tarawa",
          nome: "Tarawa Sud",
          paese: "Kiribati",
          lingua: "Gilbertino / Inglese",
          valuta: "AUD",
          fusoOrario: "UTC+12",
          coordinate: { lat: 1.3290, lng: 172.9790 },
          descrizioneBreve: "Capitale di Kiribati, atollo corallino che fu teatro di una delle battaglie più sanguinose del Pacifico nel 1943.",
          poi: [
            { id: 1, nome: "Betio War Memorial", categoria: "Storia", durata: 1.5, descrizione: "Il memoriale dedicato alla Battaglia di Tarawa (1943): in 76 ore morirono 6.000 soldati americani e giapponesi su 3 km di spiaggia.", curiosita: "La Battaglia di Tarawa fu così rapida e brutale da cambiare la strategia americana nel Pacifico. Quando le immagini dei caduti americani furono pubblicate negli USA nel 1943, fu il primo momento in cui i media mostrarono i corpi dei soldati americani — un trauma nazionale.", coordinate: { lat: 1.3571, lng: 172.9267 } },
            { id: 2, nome: "Spiagge dell'Atollo di Tarawa", categoria: "Natura", durata: 2.0, descrizione: "Le spiagge bianche su un atollo largo appena 800 metri, con laguna turchese interna e reef corallineo ricco di vita marina.", curiosita: "Tarawa è larga in media 800 metri: si può vedere il Pacifico da un lato e la laguna dall'altro stando in piedi al centro. Con l'innalzamento del mare, si prevede che diventi inabitabile entro il 2030-2040.", coordinate: { lat: 1.3290, lng: 172.9790 } },
            { id: 3, nome: "Villaggio di Bikenibeu e Cultura I-Kiribati", categoria: "Cultura", durata: 1.5, descrizione: "I villaggi tradizionali dell'atollo preservano la cultura I-Kiribati: le maneaba (case di riunione con tetto in foglie di pandano), la danza ruoia e la pesca tradizionale.", curiosita: "Le maneaba sono la struttura sociale fondamentale di Kiribati: ogni decisione comunitaria viene presa all'interno, seduti per terra seguendo regole precise di anzianità e clan. Il parlamento nazionale di Kiribati funziona esattamente come una maneaba gigante.", coordinate: { lat: 1.3536, lng: 173.1085 } },
            { id: 4, nome: "Mercato di Bairiki", categoria: "Gastronomia", durata: 1.0, descrizione: "Il piccolo mercato del distretto governativo di Bairiki con pandano, taro marino, cocco giovane e pesce appena pescato.", curiosita: "Kiribati ha uno dei tassi più alti al mondo di malattia metabolica causata dalla transizione da cibo tradizionale (pesce, cocco, pandano) a cibo importato confezionato. Il cibo locale è più sano ma il riso importato è percepito come simbolo di modernità e status.", coordinate: { lat: 1.3340, lng: 172.9762 } },
            { id: 5, nome: "Laguna Interna di Tarawa", categoria: "Natura", durata: 1.5, descrizione: "La laguna interna dell'atollo con acque basse e calde, ideale per nuoto, snorkeling e osservazione dei granchi della noce di cocco.", curiosita: "Il granchio della noce di cocco (Birgus latro) di Tarawa è il più grande artropodo terrestre del mondo: può pesare 4 kg e aprire una noce di cocco con le chele. È in via d'estinzione in quasi tutto il Pacifico ma sopravvive sugli atolli remoti di Kiribati.", coordinate: { lat: 1.3290, lng: 173.0290 } }
          ]
        }

      ]
    }

  ]
};

const output = JSON.stringify(data, null, 2);
fs.writeFileSync('/home/claude/smarttour_cities.json', output);
console.log(`OK — ${(output.length / 1024).toFixed(1)} KB, ${data.continenti.reduce((a,c) => a + c.citta.length, 0)} città, ${data.continenti.reduce((a,c) => a + c.citta.reduce((b,ci) => b + ci.poi.length, 0), 0)} POI totali`);
