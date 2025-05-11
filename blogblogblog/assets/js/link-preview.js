/**
 * Link Preview
 * Shows a preview popup when hovering over links
 */

document.addEventListener('DOMContentLoaded', function() {
  // Create preview container (added to the DOM only when needed)
  const previewContainer = document.createElement('div');
  previewContainer.className = 'link-preview-container';
  previewContainer.innerHTML = `
    <div class="link-preview-content">
      <div class="preview-loader">Loading preview...</div>
    </div>
    <div class="link-preview-arrow"></div>
  `;
  
  // Track current preview state
  let activeLink = null;
  let previewTimeout = null;
  let previewCache = {};
  
  // Find all links (both internal and external)
  const links = document.querySelectorAll('a[href]');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    
    // Skip anchor links, javascript links, and mail/tel links
    if (!href || href.startsWith('#') || 
        href.startsWith('javascript:') || 
        href.startsWith('mailto:') ||
        href.startsWith('tel:')) {
      return;
    }
    
    // Set up event listeners
    link.addEventListener('mouseenter', handleMouseEnter);
    link.addEventListener('mouseleave', handleMouseLeave);
    link.addEventListener('focus', handleMouseEnter);
    link.addEventListener('blur', handleMouseLeave);
  });
  
  /**
   * Handle mouse enter/focus event
   */
  function handleMouseEnter(e) {
    // Clear any existing timeout
    if (previewTimeout) {
      clearTimeout(previewTimeout);
    }
    
    // Set the active link
    activeLink = e.target.closest('a');
    
    // Add a delay before showing the preview
    previewTimeout = setTimeout(() => {
      // Position the container near the link
      positionPreviewContainer(activeLink);
      
      // Add to DOM if not already there
      if (!document.body.contains(previewContainer)) {
        document.body.appendChild(previewContainer);
      }
      
      // Show loading state
      previewContainer.querySelector('.link-preview-content').innerHTML = 
        '<div class="preview-loader">Loading preview...</div>';
      
      // Get URL and load preview
      const href = activeLink.getAttribute('href');
      loadPreview(href);
      
      // Show the preview
      previewContainer.classList.add('visible');
    }, 400); // Delay showing preview to avoid flickering
  }
  
  /**
   * Handle mouse leave/blur event
   */
  function handleMouseLeave() {
    // Clear timeout if it exists
    if (previewTimeout) {
      clearTimeout(previewTimeout);
      previewTimeout = null;
    }
    
    // Hide the preview
    previewContainer.classList.remove('visible');
    
    // Clear active link after a delay
    setTimeout(() => {
      if (!document.body.contains(previewContainer)) {
        activeLink = null;
      }
    }, 300);
  }
  
  /**
   * Position the preview container near the active link
   */
  function positionPreviewContainer(link) {
    const linkRect = link.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Default position is below the link
    let top = linkRect.bottom + window.scrollY + 10;
    let left = linkRect.left + window.scrollX + (linkRect.width / 2);
    let arrowClass = 'top';
    
    // If there isn't enough room below, position above
    if (linkRect.bottom + 250 > viewportHeight) {
      top = linkRect.top + window.scrollY - 10;
      arrowClass = 'bottom';
    }
    
    // Update arrow position
    const arrow = previewContainer.querySelector('.link-preview-arrow');
    arrow.className = 'link-preview-arrow ' + arrowClass;
    
    // Position the container
    previewContainer.style.top = `${top}px`;
    previewContainer.style.left = `${left}px`;
    previewContainer.style.transform = 'translateX(-50%)';
  }
  
  /**
   * Load preview for a given URL
   */
  function loadPreview(url) {
    // Check if we've already cached this preview
    if (previewCache[url]) {
      previewContainer.querySelector('.link-preview-content').innerHTML = previewCache[url];
      return;
    }
    
    // Determine if internal or external link
    const isExternal = isExternalLink(url);
    
    if (isExternal) {
      // For external links, show a simplified preview
      const previewContent = createExternalPreview(url);
      previewContainer.querySelector('.link-preview-content').innerHTML = previewContent;
      previewCache[url] = previewContent;
    } else {
      // For internal links on the same site, try to load more detailed preview
      fetchInternalPreview(url);
    }
  }
  
  /**
   * Create a preview for external links
   */
  function createExternalPreview(url) {
    // Create a URL object to parse the domain
    let domain;
    try {
      domain = new URL(url).hostname;
    } catch (e) {
      domain = url;
    }
    
    // Match domain to known sites for special formatting
    let siteName = 'External Website';
    let icon = '🔗';
    let iconBg = 'var(--y2k-blue)';
    
    // Check for known sites
    if (domain.includes('github.com')) {
      siteName = 'GitHub';
      icon = '🐙';
      iconBg = 'hsl(210, 12%, 16%)';
    } else if (domain.includes('twitter.com') || domain.includes('x.com')) {
      siteName = 'Twitter/X';
      icon = '🔥';
      iconBg = 'hsl(203, 89%, 53%)';
    } else if (domain.includes('linkedin.com')) {
      siteName = 'LinkedIn';
      icon = '💼';
      iconBg = 'hsl(210, 90%, 40%)';
    } else if (domain.includes('instagram.com')) {
      siteName = 'Instagram';
      icon = '📸';
      iconBg = 'hsl(340, 75%, 54%)';
    } else if (domain.includes('youtube.com')) {
      siteName = 'YouTube';
      icon = '📺';
      iconBg = 'hsl(0, 100%, 50%)';
    } else if (domain.includes('spotify.com')) {
      siteName = 'Spotify';
      icon = '🎵';
      iconBg = 'hsl(141, 73%, 42%)';
    }
    
    // Create a simple external preview with domain and icon
    return `
      <div class="external-preview">
        <div class="preview-icon" style="background: ${iconBg}">${icon}</div>
        <div class="preview-info">
          <div class="preview-site">${siteName}</div>
          <div class="preview-url">${domain}</div>
          <div class="preview-message">Click to visit this external site</div>
        </div>
      </div>
    `;
  }
  
  /**
   * Fetch preview content for internal links
   */
  function fetchInternalPreview(url) {
    // For internal Ghost site links, we could fetch the content
    // But for simplicity in this implementation, we'll show a basic preview
    const previewContent = `
      <div class="internal-preview">
        <div class="preview-icon">📄</div>
        <div class="preview-info">
          <div class="preview-site">This Website</div>
          <div class="preview-message">Internal link to another page</div>
        </div>
      </div>
    `;
    
    previewContainer.querySelector('.link-preview-content').innerHTML = previewContent;
    previewCache[url] = previewContent;
    
    // In a more complete implementation, you could use fetch API to get actual page content
    // and extract meaningful preview data (title, description, featured image, etc.)
  }
  
  /**
   * Checks if a URL is external to the current domain
   * @param {string} url - The URL to check
   * @return {boolean} - true if URL is external
   */
  function isExternalLink(url) {
    if (url.startsWith('http')) {
      const currentDomain = window.location.hostname;
      let urlDomain;
      
      try {
        urlDomain = new URL(url).hostname;
      } catch (e) {
        return false;
      }
      
      return currentDomain !== urlDomain;
    }
    
    // Consider mailto, tel, etc. as external
    return url.includes(':');
  }
});