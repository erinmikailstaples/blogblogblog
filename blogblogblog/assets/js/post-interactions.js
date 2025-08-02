/**
 * Post Interactions
 * Handles like buttons, share functionality, and other post interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  // Only run on post pages
  if (!document.querySelector('.post-full')) {
    return;
  }
  
  const likeButton = document.getElementById('like-button');
  const shareButton = document.getElementById('share-button');
  const likeCount = document.getElementById('like-count');
  
  if (!likeButton || !shareButton) {
    return;
  }
  
  // Initialize like functionality
  initLikeButton();
  
  // Initialize share functionality
  initShareButton();
  
  /**
   * Initialize the like button functionality
   */
  function initLikeButton() {
    const postId = likeButton.getAttribute('data-post-id');
    
    // Check if post is already liked (from localStorage)
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    const isLiked = likedPosts.includes(postId);
    
    if (isLiked) {
      likeButton.classList.add('liked');
      likeButton.querySelector('.like-text').textContent = 'Liked!';
    }
    
    // Get like count from localStorage or default to 0
    const likeCounts = JSON.parse(localStorage.getItem('postLikeCounts') || '{}');
    const currentCount = likeCounts[postId] || 0;
    likeCount.textContent = currentCount;
    
    // Like button click handler
    likeButton.addEventListener('click', function() {
      const isCurrentlyLiked = likeButton.classList.contains('liked');
      
      if (isCurrentlyLiked) {
        // Unlike
        likeButton.classList.remove('liked');
        likeButton.querySelector('.like-text').textContent = 'Like this post';
        
        // Remove from liked posts
        const updatedLikedPosts = likedPosts.filter(id => id !== postId);
        localStorage.setItem('likedPosts', JSON.stringify(updatedLikedPosts));
        
        // Decrease count
        const newCount = Math.max(0, currentCount - 1);
        likeCounts[postId] = newCount;
        localStorage.setItem('postLikeCounts', JSON.stringify(likeCounts));
        likeCount.textContent = newCount;
        
        // Animate count change
        animateCountChange(likeCount, -1);
      } else {
        // Like
        likeButton.classList.add('liked');
        likeButton.querySelector('.like-text').textContent = 'Liked!';
        
        // Add to liked posts
        likedPosts.push(postId);
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
        
        // Increase count
        const newCount = currentCount + 1;
        likeCounts[postId] = newCount;
        localStorage.setItem('postLikeCounts', JSON.stringify(likeCounts));
        likeCount.textContent = newCount;
        
        // Animate count change
        animateCountChange(likeCount, 1);
        
        // Add heart animation
        createHeartAnimation(likeButton);
      }
    });
  }
  
  /**
   * Initialize the share button functionality
   */
  function initShareButton() {
    shareButton.addEventListener('click', function() {
      const postTitle = document.querySelector('.post-title').textContent;
      const postUrl = window.location.href;
      
      // Check if Web Share API is available
      if (navigator.share) {
        navigator.share({
          title: postTitle,
          url: postUrl
        }).catch(function(error) {
          console.log('Error sharing:', error);
          fallbackShare(postTitle, postUrl);
        });
      } else {
        fallbackShare(postTitle, postUrl);
      }
    });
  }
  
  /**
   * Fallback share method using clipboard
   * @param {string} title - Post title
   * @param {string} url - Post URL
   */
  function fallbackShare(title, url) {
    const shareText = `Check out this post: ${title}\n\n${url}`;
    
    navigator.clipboard.writeText(shareText).then(function() {
      // Show success notification
      showNotification('Link copied to clipboard!', 'success');
    }).catch(function() {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      showNotification('Link copied to clipboard!', 'success');
    });
  }
  
  /**
   * Animate count change with a subtle effect
   * @param {HTMLElement} element - The count element
   * @param {number} change - The change amount (1 or -1)
   */
  function animateCountChange(element, change) {
    element.style.transform = `scale(1.2)`;
    element.style.color = change > 0 ? 'var(--y2k-orange)' : 'var(--y2k-outer-space)';
    
    setTimeout(function() {
      element.style.transform = 'scale(1)';
      element.style.color = '';
    }, 200);
  }
  
  /**
   * Create a floating heart animation
   * @param {HTMLElement} button - The like button
   */
  function createHeartAnimation(button) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤️';
    heart.style.cssText = `
      position: absolute;
      font-size: 1.5rem;
      pointer-events: none;
      z-index: 1000;
      animation: float-heart 1s ease-out forwards;
    `;
    
    // Position heart relative to button
    const buttonRect = button.getBoundingClientRect();
    heart.style.left = buttonRect.left + buttonRect.width / 2 + 'px';
    heart.style.top = buttonRect.top + 'px';
    
    document.body.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(function() {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
    }, 1000);
  }
  
  /**
   * Show a notification message
   * @param {string} message - The message to show
   * @param {string} type - The type of notification (success, error, etc.)
   */
  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--xp-glass-bg-strong);
      color: var(--y2k-outer-space);
      padding: 1rem 1.5rem;
      border-radius: var(--xp-radius);
      box-shadow: var(--xp-glass-shadow);
      z-index: 10000;
      animation: slide-in-right 0.3s ease-out;
      border: 1px solid var(--y2k-pale-azure);
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(function() {
      notification.style.animation = 'slide-out-right 0.3s ease-in';
      setTimeout(function() {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes float-heart {
    0% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translateY(-50px) scale(1.5);
      opacity: 0;
    }
  }
  
  @keyframes slide-in-right {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slide-out-right {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style); 