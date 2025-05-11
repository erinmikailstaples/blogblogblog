/**
 * External Links Enhancement
 * Adds site-specific icons to external links and applies brand colors on hover
 */

document.addEventListener('DOMContentLoaded', function() {
  // List of sites with their matching patterns, icons, and brand colors
  const sitePatterns = [
    { 
      pattern: 'github.com', 
      icon: '🐙', 
      label: 'GitHub', 
      color: 'hsl(210, 12%, 16%)' 
    },
    { 
      pattern: 'twitter.com', 
      icon: '🗑️', 
      label: 'Twitter/X (dumpster fire)', 
      color: 'hsl(203, 89%, 53%)' 
    },
    { 
      pattern: 'x.com', 
      icon: '🗑️', 
      label: 'Twitter/X (dumpster fire)', 
      color: 'hsl(203, 89%, 53%)' 
    },
    { 
      pattern: 'linkedin.com', 
      icon: '💼', 
      label: 'LinkedIn', 
      color: 'hsl(210, 90%, 40%)' 
    },
    { 
      pattern: 'instagram.com', 
      icon: '📸', 
      label: 'Instagram', 
      color: 'hsl(340, 75%, 54%)' 
    },
    { 
      pattern: 'youtube.com', 
      icon: '📺', 
      label: 'YouTube', 
      color: 'hsl(0, 100%, 50%)' 
    },
    { 
      pattern: 'twitch.tv', 
      icon: '🎥', 
      label: 'Twitch', 
      color: 'hsl(261, 43%, 45%)' 
    },
    { 
      pattern: 'discord.com', 
      icon: '👾', 
      label: 'Discord', 
      color: 'hsl(235, 86%, 65%)' 
    },
    { 
      pattern: 'reddit.com', 
      icon: '👽', 
      label: 'Reddit', 
      color: 'hsl(16, 100%, 50%)' 
    },
    { 
      pattern: 'bsky.app', 
      icon: '🦋', 
      label: 'Bluesky', 
      color: 'hsl(203, 89%, 53%)' 
    },
    { 
      pattern: 'spotify.com', 
      icon: '🎵', 
      label: 'Spotify', 
      color: 'hsl(141, 73%, 42%)' 
    },
    { 
      pattern: 'lu.ma', 
      icon: '🎟️', 
      label: 'Lu.ma Events', 
      color: 'hsl(280, 87%, 65%)' 
    },
    { 
      pattern: 'mailto:', 
      icon: '✉️', 
      label: 'Email', 
      color: 'hsl(345, 83%, 56%)' 
    },
    { 
      pattern: '.rss', 
      icon: '📡', 
      label: 'RSS Feed', 
      color: 'hsl(25, 86%, 64%)' 
    },
    { 
      pattern: 'mastodon', 
      icon: '🐘', 
      label: 'Mastodon', 
      color: 'hsl(282, 56%, 55%)' 
    },
    { 
      pattern: 'substack.com', 
      icon: '📝', 
      label: 'Substack', 
      color: 'hsl(40, 100%, 50%)' 
    },
    { 
      pattern: 'medium.com', 
      icon: '📚', 
      label: 'Medium', 
      color: 'hsl(0, 0%, 0%)' 
    },
    // Default case for any other external link
    { 
      pattern: 'external-default', 
      icon: '🔗', 
      label: 'External Link', 
      color: 'hsl(240, 100%, 47%)' 
    }
  ];

  // Get all links in the content area
  const links = document.querySelectorAll('a[href]');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    
    // Skip links that don't have an href or are anchor links
    if (!href || href.startsWith('#') || href.startsWith('javascript:')) {
      return;
    }
    
    // Check if the link is external
    const isExternal = isExternalLink(href);
    
    if (isExternal) {
      // Find matching site pattern
      let matchedSite = sitePatterns.find(site => 
        href.includes(site.pattern)
      );
      
      // Use default if no specific match is found
      if (!matchedSite) {
        matchedSite = sitePatterns.find(site => 
          site.pattern === 'external-default'
        );
      }
      
      // Add the icon and data-site attribute for styling
      if (matchedSite) {
        // Add appropriate classes and data attributes
        link.classList.add('external-link');
        link.dataset.site = matchedSite.pattern;
        link.dataset.siteColor = matchedSite.color;
        
        // Create and append the icon span with appropriate aria-label
        const iconSpan = document.createElement('span');
        iconSpan.classList.add('external-link-icon');
        iconSpan.setAttribute('aria-hidden', 'true');
        iconSpan.textContent = ` ${matchedSite.icon}`;
        link.appendChild(iconSpan);
        
        // Add screen reader text when no icon is visible
        link.setAttribute('aria-label', `${link.textContent} (${matchedSite.label}, opens in a new tab)`);
        
        // Ensure external links open in a new tab with security
        if (!link.getAttribute('target')) {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        }
      }
    }
  });
  
  /**
   * Checks if a URL is external to the current domain
   * @param {string} url - The URL to check
   * @return {boolean} - true if URL is external
   */
  function isExternalLink(url) {
    if (url.startsWith('http')) {
      const currentDomain = window.location.hostname;
      const urlDomain = new URL(url).hostname;
      return currentDomain !== urlDomain;
    }
    
    // Consider mailto, tel, etc. as external
    return url.includes(':') || url.endsWith('.rss');
  }
});