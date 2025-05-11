/**
 * Reading Progress Bar
 * Shows how much of the page the user has scrolled through
 * Only appears on post and page templates
 */

document.addEventListener('DOMContentLoaded', function() {
  // Only add the progress bar on post and page templates, not the home page
  const body = document.body;
  if (!body.classList.contains('home') && !body.classList.contains('index')) {
    
    // Create the progress bar container and inner bar
    const progressContainer = document.createElement('div');
    progressContainer.className = 'reading-progress-container';
    progressContainer.setAttribute('aria-hidden', 'true'); // Hide from screen readers
    
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress-bar';
    
    // Add to the DOM at the top of the page
    progressContainer.appendChild(progressBar);
    document.body.prepend(progressContainer);
    
    // Update progress bar width on scroll
    window.addEventListener('scroll', updateProgressBar);
    
    // Initial update
    updateProgressBar();
    
    /**
     * Updates the progress bar width based on scroll position
     */
    function updateProgressBar() {
      // Calculate how far down the page the user has scrolled
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = scrollTop / docHeight;
      
      // Update the width of the progress bar
      progressBar.style.width = scrollPercent * 100 + '%';
    }
  }
});