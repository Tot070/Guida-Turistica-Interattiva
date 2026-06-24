'use strict';
/* main.js
   Inizializzazione UI e binding eventi per SmartTour
*/

(function () {
  const STORAGE_KEYS = {
    currentUser: 'smarttour.currentUser',
    users: 'smarttour.users',
    offerRotation: 'smarttour.offerRotation',
  };

  const OFFER_POOL = [
    {
      title: 'Weekend romantico a Roma',
      location: 'Roma',
      price: '€ 299',
      description: 'Viaggio di 3 notti con trasferimento, colazione e visita guidata.',
      badge: 'Nuova offerta',
    },
    {
      title: 'Escursione a Barcellona',
      location: 'Barcellona',
      price: '€ 349',
      description: '5 giorni tra spiaggia, cultura e cibo tipico con guida locale.',
      badge: 'Top del mese',
    },
    {
      title: 'Relax in Grecia',
      location: 'Creta',
      price: '€ 389',
      description: 'Settimana bianca con hotel boutique e giri in barca.',
      badge: 'Disponibilità limitata',
    },
  ];

  function $(id) { return document.getElementById(id); }
  function escapeHtml(value) { return String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char])); }

  function readStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      console.warn('Errore lettura storage', err);
      return fallback;
    }
  }

  function writeStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  const state = {
    user: readStorage(STORAGE_KEYS.currentUser, null),
    menuOpen: false,
  };

  function syncCurrentUser(user) {
    state.user = user;
    writeStorage(STORAGE_KEYS.currentUser, user);

    const users = readStorage(STORAGE_KEYS.users, []);
    const nextUsers = users.filter(entry => entry.email !== user?.email);
    nextUsers.push(user);
    writeStorage(STORAGE_KEYS.users, nextUsers);
  }

  function clearCurrentUser() {
    state.user = null;
    writeStorage(STORAGE_KEYS.currentUser, null);
  }

  function showToast(message, type = 'info') {
    if (typeof App !== 'undefined' && typeof App.showToast === 'function') {
      App.showToast(message, type);
      return;
    }
    window.alert(message);
  }

  function getOfferRotation() {
    const stored = readStorage(STORAGE_KEYS.offerRotation, null);
    const now = Date.now();
    if (stored && stored.expiresAt > now) {
      return stored.index;
    }

    const nextIndex = Math.floor(Math.random() * OFFER_POOL.length);
    writeStorage(STORAGE_KEYS.offerRotation, { index: nextIndex, expiresAt: now + 24 * 60 * 60 * 1000 });
    return nextIndex;
  }

  function renderOffers() {
    const container = $('offersList');
    if (!container) return;

    const offer = OFFER_POOL[getOfferRotation()];
    container.innerHTML = `
      <article class="offer-card">
        <span class="offer-badge">${escapeHtml(offer.badge)}</span>
        <h3>${escapeHtml(offer.title)}</h3>
        <p class="offer-location">${escapeHtml(offer.location)}</p>
        <p>${escapeHtml(offer.description)}</p>
        <div class="offer-footer">
          <span class="offer-price">${escapeHtml(offer.price)}</span>
          <button type="button" class="btn-primary btn-sm" data-book>Prenota</button>
        </div>
      </article>
    `;

    const bookBtn = container.querySelector('[data-book]');
    if (bookBtn) bookBtn.addEventListener('click', () => bookOffer(offer));
  }

  function bookOffer(offer) {
    if (!state.user) {
      showToast('Accedi o registrati per prenotare.', 'warn');
      document.getElementById('accountPanel')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const bookedTrips = Array.isArray(state.user.bookedTrips) ? [...state.user.bookedTrips] : [];
    const alreadyBooked = bookedTrips.some(trip => trip.title === offer.title && trip.location === offer.location);
    if (!alreadyBooked) {
      bookedTrips.push({ ...offer, bookedAt: new Date().toISOString() });
    }

    const nextUser = { ...state.user, bookedTrips };
    syncCurrentUser(nextUser);
    renderAccountModule();
    updateAccountButton();
    showToast(`Prenotazione salvata per ${offer.title}`, 'ok');
  }

  function renderAccountModule() {
    const container = $('accountPanel');
    if (!container) return;

    if (!state.user) {
      container.innerHTML = `
        <div class="account-module">
          <div class="account-module__intro">
            <h2>Accedi al tuo account</h2>
            <p>Registrati per tenere sotto controllo i tuoi viaggi e le prenotazioni.</p>
          </div>
          <div class="account-module__forms">
            <form class="auth-form" id="loginForm">
              <h3>Accedi</h3>
              <label>
                <span>Email</span>
                <input type="email" name="email" required placeholder="tuo@email.com">
              </label>
              <label>
                <span>Password</span>
                <input type="password" name="password" required placeholder="••••••••">
              </label>
              <button type="submit" class="btn-primary">Accedi</button>
            </form>
            <form class="auth-form" id="registerForm">
              <h3>Registrati</h3>
              <label>
                <span>Nome</span>
                <input type="text" name="name" required placeholder="Il tuo nome">
              </label>
              <label>
                <span>Email</span>
                <input type="email" name="email" required placeholder="tuo@email.com">
              </label>
              <label>
                <span>Password</span>
                <input type="password" name="password" required placeholder="Minimo 4 caratteri">
              </label>
              <label>
                <span>Conferma password</span>
                <input type="password" name="confirmPassword" required placeholder="Ripeti la password">
              </label>
              <button type="submit" class="btn-outline">Crea account</button>
            </form>
          </div>
        </div>
      `;

      const loginForm = container.querySelector('#loginForm');
      const registerForm = container.querySelector('#registerForm');
      loginForm?.addEventListener('submit', handleLogin);
      registerForm?.addEventListener('submit', handleRegister);
      return;
    }

    const bookedTrips = Array.isArray(state.user.bookedTrips) ? state.user.bookedTrips : [];
    container.innerHTML = `
      <div class="account-module account-module--logged">
        <div class="account-module__intro">
          <h2>Ciao, ${escapeHtml(state.user.name)}</h2>
          <p>Qui trovi i dati del tuo account e i viaggi prenotati.</p>
        </div>
        <div class="account-summary">
          <div class="account-summary__item">
            <strong>Email</strong>
            <span>${escapeHtml(state.user.email)}</span>
          </div>
          <div class="account-summary__item">
            <strong>Account creato</strong>
            <span>${escapeHtml(new Date(state.user.createdAt).toLocaleDateString('it-IT'))}</span>
          </div>
        </div>
        <div class="account-bookings">
          <h3>Viaggi prenotati</h3>
          ${bookedTrips.length ? `<ul>${bookedTrips.map(trip => `<li><strong>${escapeHtml(trip.title)}</strong> · ${escapeHtml(trip.location)} · ${escapeHtml(trip.price)}</li>`).join('')}</ul>` : '<p>Nessuna prenotazione salvata.</p>'}
        </div>
        <button type="button" class="btn-outline" id="logoutBtn">Esci</button>
      </div>
    `;

    const logoutBtn = container.querySelector('#logoutBtn');
    logoutBtn?.addEventListener('click', handleLogout);
  }

  function handleLogin(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value.trim();
    const password = form.password.value;
    const users = readStorage(STORAGE_KEYS.users, []);
    const foundUser = users.find(user => user.email === email && user.password === password);

    if (!foundUser) {
      showToast('Credenziali non valide.', 'warn');
      return;
    }

    syncCurrentUser(foundUser);
    renderAccountModule();
    updateAccountButton();
    showToast('Accesso eseguito.', 'ok');
  }

  function handleRegister(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (!name || !email || password.length < 4) {
      showToast('Inserisci dati validi per registrarti.', 'warn');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Le password non coincidono.', 'warn');
      return;
    }

    const users = readStorage(STORAGE_KEYS.users, []);
    if (users.some(user => user.email === email)) {
      showToast('Esiste già un account con questa email.', 'warn');
      return;
    }

    const newUser = {
      id: crypto.randomUUID ? crypto.randomUUID() : `user-${Date.now()}`,
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
      bookedTrips: [],
    };

    syncCurrentUser(newUser);
    renderAccountModule();
    updateAccountButton();
    showToast('Registrazione completata.', 'ok');
  }

  function handleLogout() {
    clearCurrentUser();
    renderAccountModule();
    updateAccountButton();
    showToast('Hai effettuato il logout.', 'info');
  }

  function updateAccountButton() {
    const toggle = $('accountToggle');
    if (!toggle) return;
    toggle.innerHTML = state.user ? `<span>${escapeHtml(state.user.name)}</span><small>Account</small>` : 'Accedi';
    renderAccountMenu();
  }

  function renderAccountMenu() {
    const menu = $('accountMenu');
    if (!menu) return;

    if (!state.user) {
      menu.innerHTML = `
        <div class="account-menu__content">
          <p>Accedi o registrati per salvare i viaggi prenotati.</p>
          <a href="#accountPanel" class="account-menu__link">Vai alla sezione accesso</a>
        </div>
      `;
    } else {
      menu.innerHTML = `
        <div class="account-menu__content">
          <p>Ciao, ${escapeHtml(state.user.name)}</p>
          <a href="#accountPanel" class="account-menu__link">Apri il mio account</a>
          <button type="button" class="account-menu__button" id="logoutMenuBtn">Esci</button>
        </div>
      `;
      menu.querySelector('#logoutMenuBtn')?.addEventListener('click', handleLogout);
    }
  }

  function closeAccountMenu() {
    state.menuOpen = false;
    const menu = $('accountMenu');
    const toggle = $('accountToggle');
    if (menu) menu.hidden = true;
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  function toggleAccountMenu() {
    const menu = $('accountMenu');
    const toggle = $('accountToggle');
    if (!menu || !toggle) return;
    state.menuOpen = !state.menuOpen;
    menu.hidden = !state.menuOpen;
    toggle.setAttribute('aria-expanded', String(state.menuOpen));
  }

  function bindSearch() {
    const input = $('searchInput');
    const clear = $('searchClear');
    if (!input) return;

    input.addEventListener('input', () => {
      if (typeof App !== 'undefined' && typeof App.searchPOIs === 'function') {
        App.searchPOIs(input.value);
      }
      clear.hidden = input.value.trim() === '';
    });

    clear?.addEventListener('click', () => {
      input.value = '';
      if (typeof App !== 'undefined' && typeof App.searchPOIs === 'function') {
        App.searchPOIs('');
      }
      clear.hidden = true;
      input.focus();
    });
  }

  function bindAccountUi() {
    const toggle = $('accountToggle');
    const wrapper = $('accountMenuWrapper');
    toggle?.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleAccountMenu();
    });

    document.addEventListener('click', (event) => {
      if (wrapper && !wrapper.contains(event.target)) {
        closeAccountMenu();
      }
    });

    const accountLink = $('accountPanel')?.querySelector('a[href="#accountPanel"]');
    accountLink?.addEventListener('click', () => {
      document.getElementById('accountPanel')?.scrollIntoView({ behavior: 'smooth' });
      closeAccountMenu();
    });
  }

  async function init() {
    try {
      const verEl = $('appVersion');
      if (verEl && typeof Config !== 'undefined') verEl.textContent = `v${Config.VERSION}`;

      if (typeof App !== 'undefined') await App.loadDatabase();

      const continentSel = $('continentSelect');
      const citySel      = $('citySelect');
      if (continentSel) continentSel.addEventListener('change', (e) => App.loadContinent(e.target.value));
      if (citySel) citySel.addEventListener('change', (e) => App.loadCity(e.target.value));

      const genBtn = $('generateBtn');
      const resetBtn = $('resetBtn');
      if (genBtn) genBtn.addEventListener('click', () => {
        const hours = $('timeInput')?.value ?? Config.DEFAULT_HOURS;
        App.generateRoute(hours);
      });
      if (resetBtn) resetBtn.addEventListener('click', () => App.reset());

      const triviaClose = $('triviaClose');
      if (triviaClose) triviaClose.addEventListener('click', () => App.closeTrivia());

      const aiToggle = $('aiToggle');
      const aiPanel  = $('aiPanel');
      const aiClose  = $('aiClose');
      if (aiToggle && aiPanel) {
        aiToggle.addEventListener('click', () => {
          const open = aiPanel.hidden === false;
          aiPanel.hidden = open;
          aiToggle.setAttribute('aria-expanded', String(!open));
          if (!open) document.getElementById('aiInput')?.focus();
        });
      }
      if (aiClose && aiPanel) aiClose.addEventListener('click', () => { aiPanel.hidden = true; aiToggle.setAttribute('aria-expanded','false'); });

      const aiForm = $('aiForm');
      if (aiForm && typeof AI !== 'undefined') {
        aiForm.addEventListener('submit', (ev) => {
          ev.preventDefault();
          const input = $('aiInput');
          if (!input) return;
          AI.sendMessage(input.value);
          input.value = '';
        });
      }

      if (typeof AI !== 'undefined' && typeof AI.updateCallsLeft === 'function') AI.updateCallsLeft();

      bindSearch();
      bindAccountUi();
      renderOffers();
      renderAccountModule();
      updateAccountButton();
      closeAccountMenu();

      console.log('UI inizializzata');
    } catch (err) {
      console.error('Errore init main.js', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
