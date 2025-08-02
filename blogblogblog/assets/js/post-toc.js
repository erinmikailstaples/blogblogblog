/**
 * Post Table of Contents
 * Creates and manages the table of contents for blog posts
 */

document.addEventListener('DOMContentLoaded', function() {
  // Only run on post pages
  if (!document.querySelector('.post-full')) {
    return;
  }
  
  const tocToggle = document.getElementById('toc-toggle');
  const tocSidebar = document.getElementById('post-toc-sidebar');
  const postContent = document.getElementById('post-content');
  const tocList = document.getElementById('toc-list');
  
  if (!tocToggle || !tocSidebar || !postContent || !tocList) {
    return;
  }
  
  // Get all headings from the post content
  const headings = postContent.querySelectorAll('h2, h3, h4, h5, h6');
  
  if (headings.length === 0) {
    // Hide TOC if no headings
    tocToggle.style.display = 'none';
    tocSidebar.style.display = 'none';
    return;
  }
  
  // Populate the table of contents
  populateTOC(headings, tocList);
  
  // Toggle TOC visibility
  tocToggle.addEventListener('click', function() {
    const isVisible = tocSidebar.classList.contains('toc-visible');
    
    if (isVisible) {
      tocSidebar.classList.remove('toc-visible');
      tocToggle.classList.remove('toc-active');
      tocToggle.setAttribute('aria-expanded', 'false');
    } else {
      tocSidebar.classList.add('toc-visible');
      tocToggle.classList.add('toc-active');
      tocToggle.setAttribute('aria-expanded', 'true');
    }
  });
  
  // Highlight current section while scrolling
  let observer;
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          // Remove active class from all TOC items
          tocList.querySelectorAll('.toc-item').forEach(function(item) {
            item.classList.remove('toc-active');
          });
          
          // Add active class to current section
          const tocItem = tocList.querySelector(`[data-heading-id="${entry.target.id}"]`);
          if (tocItem) {
            tocItem.classList.add('toc-active');
          }
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px'
    });
    
    // Observe all headings
    headings.forEach(function(heading) {
      if (heading.id) {
        observer.observe(heading);
      }
    });
  }
  
  // Smooth scroll to sections when clicking TOC links
  tocList.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      const targetId = e.target.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without page jump
        history.pushState(null, null, '#' + targetId);
      }
    }
  });
  
  /**
   * Populates the table of contents with headings
   * @param {NodeList} headings - All headings in the post
   * @param {HTMLElement} tocList - The TOC list element
   */
  function populateTOC(headings, tocList) {
    const tocItems = [];
    
    headings.forEach(function(heading, index) {
      // Create ID if it doesn't exist
      if (!heading.id) {
        heading.id = 'heading-' + index;
      }
      
      // Create TOC item
      const tocItem = document.createElement('li');
      tocItem.className = 'toc-item';
      tocItem.setAttribute('data-heading-id', heading.id);
      
      const tocLink = document.createElement('a');
      tocLink.href = '#' + heading.id;
      tocLink.textContent = heading.textContent.trim();
      tocLink.className = 'toc-link';
      
      // Add indentation based on heading level
      const level = parseInt(heading.tagName.charAt(1));
      tocLink.style.paddingLeft = (level - 2) * 1.5 + 'rem';
      
      tocItem.appendChild(tocLink);
      tocItems.push(tocItem);
    });
    
    // Add all items to the TOC
    tocItems.forEach(function(item) {
      tocList.appendChild(item);
    });
  }
  
  // Auto-hide TOC on mobile when clicking outside
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      if (!tocSidebar.contains(e.target) && !tocToggle.contains(e.target)) {
        tocSidebar.classList.remove('toc-visible');
        tocToggle.classList.remove('toc-active');
        tocToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
  
  // Cleanup observer on page unload
  window.addEventListener('beforeunload', function() {
    if (observer) {
      observer.disconnect();
    }
  });
}); 