/**
 * Linkable Headings
 * Makes headings linkable so users can share specific sections
 */

document.addEventListener('DOMContentLoaded', function() {
  // Only add linkable headings on post and page templates
  const body = document.body;
  if (!body.classList.contains('home') && !body.classList.contains('index')) {
    // Get all headings in the post/page content area
    const contentArea = document.querySelector('.post-full-content') || document.querySelector('.content');
    
    if (!contentArea) return;
    
    // Select all headings h2-h6 (skip h1 as it's usually the title)
    const headings = contentArea.querySelectorAll('h2, h3, h4, h5, h6');
    
    // Process each heading
    headings.forEach(function(heading) {
      // Create an ID based on the heading text
      if (!heading.id) {
        const headingText = heading.textContent.trim();
        const headingId = createSlug(headingText);
        heading.id = headingId;
      }
      
      // Add the linkable class
      heading.classList.add('linkable-heading');
      
      // Create the anchor link element
      const anchorLink = document.createElement('a');
      anchorLink.className = 'heading-anchor';
      anchorLink.href = '#' + heading.id;
      anchorLink.setAttribute('aria-label', 'Link to this section: ' + heading.textContent.trim());
      anchorLink.innerHTML = '#';
      
      // Add the anchor link to the heading
      heading.appendChild(anchorLink);
      
      // Add click event to copy URL to clipboard
      anchorLink.addEventListener('click', function(e) {
        // Handle normal navigation
        // The URL will update automatically with the hash
        
        // Optional: Flash a notification that the URL has been copied
        const notification = document.createElement('div');
        notification.className = 'anchor-notification';
        notification.textContent = 'URL copied to clipboard!';
        document.body.appendChild(notification);
        
        // Copy the URL to clipboard
        const url = window.location.href.split('#')[0] + '#' + heading.id;
        navigator.clipboard.writeText(url).catch(err => {
          console.error('Could not copy URL: ', err);
        });
        
        // Remove notification after a delay
        setTimeout(function() {
          notification.classList.add('fade-out');
          setTimeout(function() {
            notification.remove();
          }, 300);
        }, 1500);
      });
    });
  }
  
  /**
   * Creates a URL-friendly slug from a string
   * @param {string} text - The text to convert to a slug
   * @return {string} - The slug
   */
  function createSlug(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special chars
      .replace(/[\s_-]+/g, '-')   // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, '')   // Remove leading/trailing hyphens
      || 'section-' + Math.floor(Math.random() * 1000); // Fallback
  }
});