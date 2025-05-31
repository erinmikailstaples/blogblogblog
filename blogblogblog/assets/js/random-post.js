/**
 * Random Post Functionality
 * Redirects to a random blog post when Random button is clicked
 */

document.addEventListener('DOMContentLoaded', function() {
  // Find all random post links
  const randomLinks = document.querySelectorAll('a[href*="/random"], a[href$="/random"]');
  
  randomLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Show loading state
      const originalText = link.textContent;
      link.textContent = 'Loading...';
      link.style.pointerEvents = 'none';
      
      // Get random post from posts visible on the current page
      getRandomPostFromPage()
        .then(url => {
          if (url) {
            window.location.href = url;
          } else {
            // Restore button and try a simple fallback
            link.textContent = originalText;
            link.style.pointerEvents = 'auto';
            // Just reload the current page as fallback
            window.location.reload();
          }
        })
        .catch(error => {
          console.error('Error getting random post:', error);
          // Restore button state
          link.textContent = originalText;
          link.style.pointerEvents = 'auto';
        });
    });
  });
  
  /**
   * Get a random post from the posts visible on the current page
   * @return {Promise<string>} - URL of a random post
   */
  function getRandomPostFromPage() {
    return new Promise((resolve) => {
      // Look for post links on the current page
      const postLinks = document.querySelectorAll('.post-card-link, .post-card a, .post-title a, .post-list a');
      
      if (postLinks.length > 0) {
        const randomIndex = Math.floor(Math.random() * postLinks.length);
        const randomPost = postLinks[randomIndex];
        resolve(randomPost.href);
      } else {
        // If no post links found, try to navigate to a typical post structure
        // This is a simple fallback for development
        const fallbackPosts = [
          '/welcome/',
          '/coming-soon/',
          '/hello-world/',
          '/sample-post/',
          '/test-post/',
        ];
        
        const randomIndex = Math.floor(Math.random() * fallbackPosts.length);
        resolve(fallbackPosts[randomIndex]);
      }
    });
  }
});
