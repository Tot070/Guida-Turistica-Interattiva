'use strict';
/* main.js
   Inizializzazione UI e binding eventi per SmartTour
*/

(function () {
  function $(id) { return document.getElementById(id); }

  async function init() {
    try {
      // Visualizza versione
      const verEl = $('appVersion');
      if (verEl && typeof Config !== 'undefined') verEl.textContent = `v${Config.VERSION}`;

      // Carica database e popolamento select
      if (typeof App !== 'undefined') await App.loadDatabase();

      // Bind selects
      const continentSel = $('continentSelect');
      const citySel      = $('citySelect');
      if (continentSel) continentSel.addEventListener('change', (e) => App.loadContinent(e.target.value));
      if (citySel) citySel.addEventListener('change', (e) => App.loadCity(e.target.value));

      // Buttons
      const genBtn = $('generateBtn');
      const resetBtn = $('resetBtn');
      if (genBtn) genBtn.addEventListener('click', () => {
        const hours = $('timeInput')?.value ?? Config.DEFAULT_HOURS;
        App.generateRoute(hours);
      });
      if (resetBtn) resetBtn.addEventListener('click', () => App.reset());

      // Trivia modal close
      const triviaClose = $('triviaClose');
      if (triviaClose) triviaClose.addEventListener('click', () => App.closeTrivia());

      // AI panel toggle
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

      // AI form
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

      // update calls left if available
      if (typeof AI !== 'undefined' && typeof AI.updateCallsLeft === 'function') AI.updateCallsLeft();

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
