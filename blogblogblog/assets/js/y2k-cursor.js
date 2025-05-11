/**
 * Y2K Custom Cursor
 * Adds a retro custom cursor effect
 */

document.addEventListener('DOMContentLoaded', function() {
  // Only add the custom cursor if not on mobile (it can be annoying on touch devices)
  if (window.matchMedia('(min-width: 768px)').matches) {
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'y2k-cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'y2k-cursor-dot';
    document.body.appendChild(cursorDot);
    
    // Update cursor position on mouse move
    document.addEventListener('mousemove', function(e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      // Delayed follow for the dot
      setTimeout(() => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
      }, 100);
    });
    
    // Hide default cursor
    document.documentElement.style.cursor = 'none';
    
    // Show/hide the custom cursor based on hover
    document.addEventListener('mouseenter', function() {
      cursor.style.opacity = '1';
      cursorDot.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', function() {
      cursor.style.opacity = '0';
      cursorDot.style.opacity = '0';
    });
    
    // Add pulse effect on click
    document.addEventListener('mousedown', function() {
      cursor.classList.add('click');
      setTimeout(() => {
        cursor.classList.remove('click');
      }, 500);
    });
    
    // Modify cursor appearance on links and buttons
    const interactives = document.querySelectorAll('a, button, input, textarea, select');
    
    interactives.forEach(el => {
      el.addEventListener('mouseenter', function() {
        cursor.classList.add('hover');
      });
      
      el.addEventListener('mouseleave', function() {
        cursor.classList.remove('hover');
      });
    });
  }
});