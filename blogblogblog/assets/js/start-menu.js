document.addEventListener('DOMContentLoaded', function () {
  const startBtn = document.querySelector('[data-toggle-startmenu]');
  const sidebar = document.querySelector('.sidebar');
  
  // Get sidebar state from localStorage (default: hidden)
  let sidebarEnabled = localStorage.getItem('sidebar-enabled') === 'true';
  
  // Apply initial state
  if (sidebarEnabled) {
    sidebar.classList.add('sidebar-visible');
    sidebar.setAttribute('aria-expanded', 'true');
    startBtn.setAttribute('aria-pressed', 'true');
    startBtn.setAttribute('aria-label', 'Hide sidebar');
  } else {
    sidebar.classList.remove('sidebar-visible');
    sidebar.setAttribute('aria-expanded', 'false');
    startBtn.setAttribute('aria-pressed', 'false');
    startBtn.setAttribute('aria-label', 'Show sidebar');
  }
  
  function toggleSidebar() {
    sidebarEnabled = !sidebarEnabled;
    
    if (sidebarEnabled) {
      sidebar.classList.add('sidebar-visible');
      sidebar.setAttribute('aria-expanded', 'true');
      startBtn.setAttribute('aria-pressed', 'true');
      startBtn.setAttribute('aria-label', 'Hide sidebar');
    } else {
      sidebar.classList.remove('sidebar-visible');
      sidebar.setAttribute('aria-expanded', 'false');
      startBtn.setAttribute('aria-pressed', 'false');
      startBtn.setAttribute('aria-label', 'Show sidebar');
    }
    
    // Save state to localStorage
    localStorage.setItem('sidebar-enabled', sidebarEnabled.toString());
  }

  if (startBtn && sidebar) {
    startBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleSidebar();
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function (e) {
      if (sidebarEnabled && !sidebar.contains(e.target) && e.target !== startBtn) {
        toggleSidebar();
      }
    });

    // Keyboard support
    startBtn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleSidebar();
      }
    });
    
    // ESC to close sidebar
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebarEnabled) {
        toggleSidebar();
      }
    });
  }
}); 