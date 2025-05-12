document.addEventListener('DOMContentLoaded', function () {
  const startBtn = document.querySelector('[data-toggle-startmenu]');
  const startMenu = document.getElementById('xp-start-menu');
  let lastFocused = null;

  function openMenu() {
    startMenu.hidden = false;
    startMenu.focus();
    lastFocused = document.activeElement;
    document.body.classList.add('start-menu-open');
  }

  function closeMenu() {
    startMenu.hidden = true;
    document.body.classList.remove('start-menu-open');
    if (lastFocused) lastFocused.focus();
  }

  startBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (startMenu.hidden) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  // Close menu on click outside
  document.addEventListener('click', function (e) {
    if (!startMenu.hidden && !startMenu.contains(e.target) && e.target !== startBtn) {
      closeMenu();
    }
  });

  // Keyboard accessibility
  startMenu.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
}); 