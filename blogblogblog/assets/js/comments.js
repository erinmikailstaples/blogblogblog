/**
 * Comments System
 * Handles different comment options (Disqus, GitHub, Simple Form)
 */

document.addEventListener('DOMContentLoaded', function() {
  // Only run on post pages
  if (!document.querySelector('.post-full')) {
    return;
  }
  
  const commentOptions = document.querySelectorAll('.comment-option-btn');
  const commentSystems = document.querySelectorAll('.comment-system');
  
  if (!commentOptions.length || !commentSystems.length) {
    return;
  }
  
  // Initialize comment system
  initCommentSystem();
  
  /**
   * Initialize the comment system
   */
  function initCommentSystem() {
    // Handle comment option switching
    commentOptions.forEach(function(option) {
      option.addEventListener('click', function() {
        const commentType = this.getAttribute('data-comment-type');
        
        // Update active button
        commentOptions.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Show selected comment system
        commentSystems.forEach(system => {
          system.classList.remove('active');
        });
        
        const targetSystem = document.getElementById(commentType + '-comments');
        if (targetSystem) {
          targetSystem.classList.add('active');
        }
        
        // Load appropriate comment system
        loadCommentSystem(commentType);
      });
    });
    
    // Initialize simple comment form
    initSimpleCommentForm();
    
    // Load default comment system (Disqus)
    loadCommentSystem('disqus');
  }
  
  /**
   * Load the appropriate comment system
   * @param {string} type - The type of comment system to load
   */
  function loadCommentSystem(type) {
    switch (type) {
      case 'disqus':
        loadDisqus();
        break;
      case 'simple':
        loadSimpleComments();
        break;
    }
  }
  
  /**
   * Load Disqus comments
   */
  function loadDisqus() {
    // Check if Disqus is already loaded
    if (window.DISQUS) {
      return;
    }
    
    // Create Disqus script
    const disqusScript = document.createElement('script');
    disqusScript.src = 'https://your-disqus-shortname.disqus.com/embed.js';
    disqusScript.setAttribute('data-timestamp', +new Date());
    disqusScript.async = true;
    
    // Add Disqus configuration
    window.disqus_config = function() {
      this.page.url = window.location.href;
      this.page.identifier = window.location.pathname;
      this.page.title = document.querySelector('.post-title').textContent;
    };
    
    // Add script to page
    document.head.appendChild(disqusScript);
    
    // Hide placeholder after a delay
    setTimeout(function() {
      const placeholder = document.querySelector('.comment-placeholder');
      if (placeholder) {
        placeholder.style.display = 'none';
      }
    }, 2000);
  }
  
  /**
   * Initialize the simple comment form
   */
  function initSimpleCommentForm() {
    const form = document.getElementById('simple-comment-form');
    const commentsList = document.getElementById('simple-comments-list');
    
    if (!form || !commentsList) {
      return;
    }
    
    // Load existing comments
    loadSimpleComments();
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(form);
      const comment = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        date: new Date().toISOString(),
        postId: window.location.pathname
      };
      
      // Save comment to localStorage (in a real app, you'd send to a server)
      saveComment(comment);
      
      // Add comment to the list
      addCommentToList(comment);
      
      // Reset form
      form.reset();
      
      // Show success message
      showCommentNotification('Comment posted successfully!', 'success');
    });
  }
  
  /**
   * Save comment to localStorage
   * @param {Object} comment - The comment object
   */
  function saveComment(comment) {
    const comments = JSON.parse(localStorage.getItem('blogComments') || '{}');
    const postId = comment.postId;
    
    if (!comments[postId]) {
      comments[postId] = [];
    }
    
    comments[postId].push(comment);
    localStorage.setItem('blogComments', JSON.stringify(comments));
  }
  
  /**
   * Load simple comments from localStorage
   */
  function loadSimpleComments() {
    const commentsList = document.getElementById('simple-comments-list');
    if (!commentsList) {
      return;
    }
    
    const comments = JSON.parse(localStorage.getItem('blogComments') || '{}');
    const postId = window.location.pathname;
    const postComments = comments[postId] || [];
    
    if (postComments.length === 0) {
      commentsList.innerHTML = '<p class="no-comments">No comments yet. Be the first to comment!</p>';
      return;
    }
    
    // Clear existing comments
    commentsList.innerHTML = '';
    
    // Add comments to the list
    postComments.forEach(function(comment) {
      addCommentToList(comment, false);
    });
  }
  
  /**
   * Add a comment to the comments list
   * @param {Object} comment - The comment object
   * @param {boolean} prepend - Whether to prepend the comment (for new comments)
   */
  function addCommentToList(comment, prepend = true) {
    const commentsList = document.getElementById('simple-comments-list');
    if (!commentsList) {
      return;
    }
    
    // Remove "no comments" message if it exists
    const noComments = commentsList.querySelector('.no-comments');
    if (noComments) {
      noComments.remove();
    }
    
    const commentElement = document.createElement('div');
    commentElement.className = 'simple-comment';
    commentElement.innerHTML = `
      <div class="comment-header">
        <span class="comment-author">${escapeHtml(comment.name)}</span>
        <time class="comment-date" datetime="${comment.date}">
          ${formatDate(comment.date)}
        </time>
      </div>
      <div class="comment-content">
        ${escapeHtml(comment.message)}
      </div>
    `;
    
    if (prepend) {
      commentsList.insertBefore(commentElement, commentsList.firstChild);
    } else {
      commentsList.appendChild(commentElement);
    }
  }
  
  /**
   * Show a notification message
   * @param {string} message - The message to show
   * @param {string} type - The type of notification
   */
  function showCommentNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `comment-notification comment-notification-${type}`;
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
      font-weight: 600;
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
  
  /**
   * Escape HTML to prevent XSS
   * @param {string} text - The text to escape
   * @return {string} - The escaped text
   */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  /**
   * Format a date string
   * @param {string} dateString - The date string to format
   * @return {string} - The formatted date
   */
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
});

// Add CSS for comment notifications
const commentStyle = document.createElement('style');
commentStyle.textContent = `
  .comment-notification-success {
    border-color: var(--y2k-mindaro);
    background: rgba(220, 247, 99, 0.9);
  }
  
  .comment-notification-error {
    border-color: #ff6b6b;
    background: rgba(255, 107, 107, 0.9);
  }
`;
document.head.appendChild(commentStyle); 