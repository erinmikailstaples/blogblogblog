/**
 * Y2K-Style Visitor Counter
 * Simulates an old-school visitor counter that was popular in the late 90s/early 2000s
 */

document.addEventListener('DOMContentLoaded', function() {
  // Look for the footer where we'll add the counter
  const footer = document.querySelector('.site-footer .footer-meta');
  
  if (footer) {
    // Create the visitor counter container
    const counterContainer = document.createElement('div');
    counterContainer.className = 'visitor-counter';
    
    // Generate a base number (using localStorage to somewhat persist it)
    let baseCount = 0;
    
    // Try to get a stored count from localStorage
    if (window.localStorage) {
      const storedCount = localStorage.getItem('y2k_visitor_count');
      if (storedCount) {
        baseCount = parseInt(storedCount, 10);
      } else {
        // Generate a random starting number that looks plausible
        baseCount = Math.floor(Math.random() * 15000) + 5000;
        localStorage.setItem('y2k_visitor_count', baseCount.toString());
      }
    } else {
      // Fallback if localStorage isn't available
      baseCount = Math.floor(Math.random() * 15000) + 5000;
    }
    
    // Increment the count for this visit
    baseCount++;
    
    // Save the new count
    if (window.localStorage) {
      localStorage.setItem('y2k_visitor_count', baseCount.toString());
    }
    
    // Format the counter with leading zeros
    const formattedCount = baseCount.toString().padStart(8, '0');
    
    // Create the counter display
    counterContainer.innerHTML = `
      <div class="visitor-counter-label">visitors:</div>
      <div class="visitor-counter-digits">
        ${formattedCount.split('').map(digit => 
          `<span class="counter-digit">${digit}</span>`
        ).join('')}
      </div>
    `;
    
    // Add counter to footer
    footer.appendChild(counterContainer);
    
    // Add a glitch effect occasionally
    setInterval(() => {
      const shouldGlitch = Math.random() > 0.7;
      if (shouldGlitch) {
        const digits = counterContainer.querySelectorAll('.counter-digit');
        const randomDigit = Math.floor(Math.random() * digits.length);
        digits[randomDigit].classList.add('glitch');
        
        setTimeout(() => {
          digits[randomDigit].classList.remove('glitch');
        }, 500);
      }
    }, 3000);
  }
});