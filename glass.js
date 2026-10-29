// Glass theme helpers: light/dark theme switch, live-status tagging, and cursor-follow highlight on .proj cards.
(function () {
  var root = document.documentElement;

  var btn = document.createElement('button');
  btn.className = 'theme-switch';
  btn.type = 'button';
  btn.innerHTML = '<span class="ts-dot"></span>';
  function sync() {
    var dark = root.dataset.theme === 'dark';
    var text = 'Switch to ' + (dark ? 'light' : 'dark') + ' theme';
    btn.setAttribute('aria-label', text);
    btn.title = text;
  }
  btn.addEventListener('click', function () {
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    if (next === 'dark') root.dataset.theme = 'dark'; else delete root.dataset.theme;
    try { localStorage.setItem('theme', next); } catch (e) {}
    sync();
  });
  sync();
  document.body.appendChild(btn);

  // tag live projects so the dark theme can colour their status dot
  document.querySelectorAll('.proj-meta .status').forEach(function (el) {
    if (/\blive\b/i.test(el.textContent)) el.classList.add('is-live');
  });

  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll('.proj').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
})();
