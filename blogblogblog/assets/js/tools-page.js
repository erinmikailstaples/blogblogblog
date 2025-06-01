/**
 * Tools Page Enhancement
 * Updates the "last updated" timestamp automatically
 */

document.addEventListener('DOMContentLoaded', function() {
  const lastUpdatedEl = document.getElementById('tools-last-updated');
  
  if (lastUpdatedEl) {
    // Set the last updated date to today
    const today = new Date();
    lastUpdatedEl.textContent = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
});
