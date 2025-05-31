/**
 * Sidebar FAB Toggle
 * Handles the floating action button sidebar toggle
 */

document.addEventListener('DOMContentLoaded', function() {
  const wrapper = document.getElementById('main-wrapper');
  const sidebar = document.querySelector('.sidebar');
  const toggleFab = document.getElementById('sidebar-toggle-fab');
  
  // Check if elements exist
  if (!wrapper || !sidebar || !toggleFab) {
    console.warn('Sidebar toggle elements not found');
    return;
  }
  
  // Get sidebar state from localStorage (default: hidden)
  let sidebarEnabled = localStorage.getItem('sidebar-enabled') === 'true';
  
  // Apply initial state
  if (sidebarEnabled) {
    sidebar.classList.add('sidebar-visible');
    sidebar.setAttribute('aria-expanded', 'true');
    toggleFab.setAttribute('aria-pressed', 'true');
    toggleFab.setAttribute('aria-label', 'Hide sidebar');
  } else {
    sidebar.classList.remove('sidebar-visible');
    sidebar.setAttribute('aria-expanded', 'false');
    toggleFab.setAttribute('aria-pressed', 'false');
    toggleFab.setAttribute('aria-label', 'Show sidebar');
  }
  
  // Toggle function
  function toggleSidebar() {
    sidebarEnabled = !sidebarEnabled;
    
    if (sidebarEnabled) {
      sidebar.classList.add('sidebar-visible');
      sidebar.setAttribute('aria-expanded', 'true');
      toggleFab.setAttribute('aria-pressed', 'true');
      toggleFab.setAttribute('aria-label', 'Hide sidebar');
      
      // Add a small animation to indicate change
      toggleFab.style.transform = 'scale(1.2)';
      setTimeout(() => {
        toggleFab.style.transform = '';
      }, 200);
      
    } else {
      sidebar.classList.remove('sidebar-visible');
      sidebar.setAttribute('aria-expanded', 'false');
      toggleFab.setAttribute('aria-pressed', 'false');
      toggleFab.setAttribute('aria-label', 'Show sidebar');
      
      // Add a small animation to indicate change
      toggleFab.style.transform = 'scale(0.8)';
      setTimeout(() => {
        toggleFab.style.transform = '';
      }, 200);
    }
    
    // Save state to localStorage
    localStorage.setItem('sidebar-enabled', sidebarEnabled.toString());
  }
  
  // Event listeners
  toggleFab.addEventListener('click', toggleSidebar);
  
  // Keyboard support
  toggleFab.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleSidebar();
    }
  });
  
  // Optional: Auto-hide on mobile/tablet for better UX
  function handleResize() {
    if (window.innerWidth < 1024 && sidebarEnabled) {
      // On smaller screens, sidebar might be too intrusive
      // You can add logic here to auto-hide if desired
    }
  }
  
  window.addEventListener('resize', handleResize);
  
  // Optional: Keyboard shortcut (Ctrl/Cmd + B)
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      toggleSidebar();
    }
  });
});
