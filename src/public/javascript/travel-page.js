'use strict';
/* ═══════════════════════════════════════════════════════════════════
   SmartTour · travel-page.js
   Logica pagina "Viaggia con Noi":
   - Visualizzazione offerte con filtri
   - Gestione login/registrazione (localStorage)
   - Applicazione codici sconto
   - Prenotazione biglietti
   ═══════════════════════════════════════════════════════════════════ */

const TravelPage = (() => {
  let currentOffers = [...TRAVEL_OFFERS.offers];
  let appliedDiscount = 0;

  /* ═══ Storage Utente ═══════════════════════════════════════════ */
  const User = {
    get current() {
      const stored = localStorage.getItem('st_user');
      return stored ? JSON.parse(stored) : null;
    },
    set current(user) {
      if (user) localStorage.setItem('st_user', JSON.stringify(user));
      else localStorage.removeItem('st_user');
    },
    logout() {
      this.current = null;
    },
  };

  /* ═══ Init ═════════════════════════════════════════════════════ */
  function init() {
    renderOffers(currentOffers);
    renderDiscounts();
    bindEvents();
    updateAuthButton();
  }

  /* ═══ Render Offerte ═══════════════════════════════════════════ */
  function renderOffers(offers) {
    const grid = document.getElementById('offersGrid');
    grid.innerHTML = '';

    if (!offers || offers.length === 0) {
      grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--txt-muted);">Nessuna offerta trovata con i filtri selezionati.</p>';
      return;
    }

    const frag = document.createDocumentFragment();
    offers.forEach(offer => {
      const card = createOfferCard(offer);
      frag.appendChild(card);
    });
    grid.appendChild(frag);
  }

  function createOfferCard(offer) {
    const article = document.createElement('article');
    article.className = 'offer-card';
    article.role = 'listitem';

    const prezzoFinale = Math.round(offer.prezzo_scontato * (1 - appliedDiscount / 100));

    article.innerHTML = `
      <div class="offer-card-image">🌍</div>
      <div class="offer-card-body">
        <div class="offer-card-destination">${sanitize(offer.destinazione)}</div>
        <div class="offer-card-description">${sanitize(offer.descrizione)}</div>
        
        <div class="offer-card-prices">
          <span class="prezzo-originale">€${offer.prezzo_base}</span>
          <span class="prezzo-scontato">€${prezzoFinale}</span>
          <span class="badge-sconto">${Math.round((1 - prezzoFinale/offer.prezzo_base)*100)}%</span>
        </div>
        
        <div class="offer-card-meta">
          <span>📅 ${offer.durata_giorni} giorni</span>
          <span>💺 ${offer.posti_disponibili} posti</span>
        </div>
        
        <div class="offer-card-footer">
          <button class="btn-outline btn-sm" data-id="${offer.id}">Dettagli</button>
          <button class="btn-primary btn-sm" data-id="${offer.id}">Prenota</button>
        </div>
      </div>
    `;

    article.querySelector('[data-id]').addEventListener('click', () => showOfferDetail(offer));
    const prenota = article.querySelectorAll('[data-id]')[1];
    prenota.addEventListener('click', () => bookOffer(offer));

    return article;
  }

  /* ═══ Render Sconti ────────────────────────────────────────── */
  function renderDiscounts() {
    const grid = document.getElementById('discountsGrid');
    grid.innerHTML = '';

    const frag = document.createDocumentFragment();
    TRAVEL_OFFERS.sconto_categorie.forEach(cat => {
      const card = document.createElement('div');
      card.className = 'discount-card';
      card.innerHTML = `
        <h3>${sanitize(cat.categoria)}</h3>
        <div class="discount-percentage">-${cat.sconto_aggiuntivo}%</div>
        <div class="discount-code">${cat.codice}</div>
      `;
      frag.appendChild(card);
    });
    grid.appendChild(frag);
  }

  /* ═══ Filtri ───────────────────────────────────────────────── */
  function applyFilters() {
    const continente = document.getElementById('filterContinente').value;
    const prezzo = parseInt(document.getElementById('filterPrezzo').value);
    const durata = document.getElementById('filterDurata').value;

    currentOffers = TRAVEL_OFFERS.offers.filter(offer => {
      const matchCont = !continente || offer.continente === continente;
      const matchPrezzo = offer.prezzo_scontato <= prezzo;
      const matchDurata = !durata || 
        (durata === '1-3' && offer.durata_giorni <= 3) ||
        (durata === '4-7' && offer.durata_giorni >= 4 && offer.durata_giorni <= 7) ||
        (durata === '7+' && offer.durata_giorni > 7);
      
      return matchCont && matchPrezzo && matchDurata;
    });

    renderOffers(currentOffers);
  }

  /* ═══ Codici Sconto ────────────────────────────────────────── */
  function applyPromoCode() {
    const code = document.getElementById('codiceSconto').value.toUpperCase().trim();
    if (!code) return;

    const discount = TRAVEL_OFFERS.sconto_categorie.find(cat => cat.codice === code);
    if (discount) {
      appliedDiscount = discount.sconto_aggiuntivo;
      document.getElementById('scontoInfo').textContent = `✓ Sconto ${discount.sconto_aggiuntivo}% applicato!`;
      document.getElementById('scontoInfo').style.color = 'var(--ok)';
      renderOffers(currentOffers);
      showToast(`Sconto di ${discount.sconto_aggiuntivo}% applicato!`, 'ok');
    } else {
      document.getElementById('scontoInfo').textContent = '✗ Codice non valido';
      document.getElementById('scontoInfo').style.color = 'var(--warn)';
    }
  }

  /* ═══ Dettaglio Offerta ────────────────────────────────────── */
  function showOfferDetail(offer) {
    const modal = document.getElementById('offerModal');
    const prezzoFinale = Math.round(offer.prezzo_scontato * (1 - appliedDiscount / 100));

    document.getElementById('offerTitle').textContent = sanitize(offer.destinazione);
    document.getElementById('detailDescrizione').textContent = sanitize(offer.descrizione);
    document.getElementById('detailPrezzoBase').textContent = `€${offer.prezzo_base}`;
    document.getElementById('detailPrezzoSconto').textContent = `€${prezzoFinale}`;
    document.getElementById('detailSconto').textContent = Math.round((1 - prezzoFinale/offer.prezzo_base)*100) + '%';
    document.getElementById('detailDurata').textContent = offer.durata_giorni;
    document.getElementById('detailData').textContent = new Date(offer.data_partenza).toLocaleDateString('it-IT');
    document.getElementById('detailPosti').textContent = offer.posti_disponibili;

    const inclusoList = document.getElementById('detailIncluso');
    inclusoList.innerHTML = '';
    offer.incluso.forEach(item => {
      const li = document.createElement('li');
      li.textContent = sanitize(item);
      inclusoList.appendChild(li);
    });

    modal.hidden = false;
    modal.focus();
  }

  function bookOffer(offer) {
    if (!User.current) {
      showAuthModal();
      showToast('Accedi per prenotare', 'info');
      return;
    }

    const prezzoFinale = Math.round(offer.prezzo_scontato * (1 - appliedDiscount / 100));
    showToast(`✓ Prenotazione confermata per ${offer.destinazione} - Totale €${prezzoFinale}`, 'ok');
    
    // Salva prenotazione
    const bookings = JSON.parse(localStorage.getItem('st_bookings') || '[]');
    bookings.push({
      id: Date.now(),
      destinazione: offer.destinazione,
      prezzo: prezzoFinale,
      data: new Date().toISOString(),
    });
    localStorage.setItem('st_bookings', JSON.stringify(bookings));

    document.getElementById('offerModal').hidden = true;
  }

  /* ═══ Auth Modal ───────────────────────────────────────────── */
  function showAuthModal() {
    document.getElementById('authModal').hidden = false;
    document.getElementById('authModal').focus();
  }

  function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (email && password.length >= 6) {
      User.current = { email, name: email.split('@')[0], loginDate: new Date().toISOString() };
      showToast('✓ Accesso riuscito!', 'ok');
      document.getElementById('authModal').hidden = true;
      updateAuthButton();
      document.getElementById('loginForm').reset();
    } else {
      showToast('Email e password valide richieste', 'warn');
    }
  }

  function handleRegister(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('emailReg').value.trim();
    const password = document.getElementById('passwordReg').value;

    if (nome && email && password.length >= 6) {
      User.current = { email, name: nome, registered: true, registrationDate: new Date().toISOString() };
      showToast('✓ Registrazione riuscita! Benvenuto!', 'ok');
      document.getElementById('authModal').hidden = true;
      updateAuthButton();
      document.getElementById('registerForm').reset();
    } else {
      showToast('Compila tutti i campi correttamente', 'warn');
    }
  }

  function updateAuthButton() {
    const btn = document.getElementById('authBtn');
    const btnMobile = document.getElementById('authBtnMobile');
    if (User.current) {
      btn.textContent = `👤 ${User.current.name}`;
      btnMobile.textContent = `👤 ${User.current.name}`;
      btn.onclick = () => {
        User.logout();
        updateAuthButton();
        showToast('Logout riuscito', 'ok');
      };
      btnMobile.onclick = btn.onclick;
    } else {
      btn.textContent = '🔑 Accedi';
      btnMobile.textContent = '🔑 Accedi';
      btn.onclick = showAuthModal;
      btnMobile.onclick = showAuthModal;
    }
  }

  /* ═══ Menu Hamburger ───────────────────────────────────────── */
  function toggleMenu() {
    const menu = document.getElementById('navMobile');
    const toggle = document.getElementById('menuToggle');
    const isOpen = menu.hidden === false;
    
    menu.hidden = isOpen;
    toggle.setAttribute('aria-expanded', String(!isOpen));
  }

  /* ═══ Toast ────────────────────────────────────────────────── */
  function showToast(msg, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = msg;
    toast.setAttribute('role', 'alert');
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }

  /* ═══ Utilità ──────────────────────────────────────────────── */
  function sanitize(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /* ═══ Event Binding ────────────────────────────────────────── */
  function bindEvents() {
    // Filtri
    document.getElementById('filterContinente').addEventListener('change', applyFilters);
    document.getElementById('filterPrezzo').addEventListener('change', () => {
      document.getElementById('prezzoDis').textContent = `€${document.getElementById('filterPrezzo').value}`;
      applyFilters();
    });
    document.getElementById('filterDurata').addEventListener('change', applyFilters);
    document.getElementById('resetFilters').addEventListener('click', () => {
      document.getElementById('filterContinente').value = '';
      document.getElementById('filterPrezzo').value = '1500';
      document.getElementById('filterDurata').value = '';
      document.getElementById('prezzoDis').textContent = '€1500';
      appliedDiscount = 0;
      document.getElementById('scontoInfo').textContent = '';
      document.getElementById('codiceSconto').value = '';
      currentOffers = [...TRAVEL_OFFERS.offers];
      renderOffers(currentOffers);
    });

    // Sconto
    document.getElementById('applicaSconto').addEventListener('click', applyPromoCode);
    document.getElementById('codiceSconto').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') applyPromoCode();
    });

    // Auth
    document.getElementById('authBtn').addEventListener('click', showAuthModal);
    document.getElementById('authBtnMobile').addEventListener('click', showAuthModal);
    document.getElementById('authClose').addEventListener('click', () => {
      document.getElementById('authModal').hidden = true;
    });
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);

    // Modal Offerta
    document.getElementById('offerClose').addEventListener('click', () => {
      document.getElementById('offerModal').hidden = true;
    });
    document.getElementById('offerCloseBtn').addEventListener('click', () => {
      document.getElementById('offerModal').hidden = true;
    });
    document.getElementById('offerPrenotaBtn').addEventListener('click', () => {
      const offer = currentOffers[0];
      if (offer) bookOffer(offer);
    });

    // Menu hamburger
    document.getElementById('menuToggle').addEventListener('click', toggleMenu);
  }

  /* ═══ API Pubblica ═════════════════════════════════════════════ */
  return Object.freeze({
    init,
    User,
  });

})();

// Init quando DOM è pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => TravelPage.init());
} else {
  TravelPage.init();
}
