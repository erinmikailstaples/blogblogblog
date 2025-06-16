document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('sidebar-toggle');

  function toggleSidebar() {
    const expanded = sidebar.getAttribute('aria-expanded') === 'true';
    sidebar.setAttribute('aria-expanded', !expanded);
    toggleBtn.setAttribute('aria-expanded', !expanded);
  }

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', toggleSidebar);
    toggleBtn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleSidebar();
      }
    });
  }

  // Y2K Flashlight Light/Dark Mode Toggle
  (function() {
    const body = document.body;
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    // Helper: get system preference
    function getSystemTheme() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Helper: apply theme
    function applyTheme(theme) {
      body.classList.remove('theme-dark', 'theme-light');
      body.classList.add('theme-' + theme);
      toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      // Update aria-label for screen readers
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }

    // Get saved theme or system preference
    let theme = localStorage.getItem('theme');
    if (!theme) {
      theme = getSystemTheme();
    }
    applyTheme(theme);

    // Toggle on click
    toggle.addEventListener('click', function() {
      theme = body.classList.contains('theme-dark') ? 'light' : 'dark';
      localStorage.setItem('theme', theme);
      applyTheme(theme);
    });

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  })();
}); 