/**
 * Guestbook functionality
 * Handles drawing, form submission, and displaying entries
 */

document.addEventListener('DOMContentLoaded', function() {
  // Only run on guestbook page
  if (!document.querySelector('.guestbook-page')) return;

  const canvas = document.getElementById('drawing-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const form = document.getElementById('guestbook-form');
  const entriesContainer = document.getElementById('entries-container');
  
  let isDrawing = false;
  let currentColor = '#ff8600';
  let currentSize = 3;

  // Initialize canvas if present
  if (canvas && ctx) {
    initializeCanvas();
  }

  // Initialize form
  if (form) {
    initializeForm();
  }

  // Load existing entries
  loadGuestbookEntries();

  function initializeCanvas() {
    // Set up canvas
    const rect = canvas.getBoundingClientRect();
    canvas.width = 400;
    canvas.height = 200;
    
    // Style context
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Drawing event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);
    
    // Color and size controls
    const colorPicker = document.getElementById('pen-color');
    const sizePicker = document.getElementById('pen-size');
    const clearBtn = document.getElementById('clear-canvas');
    
    if (colorPicker) {
      colorPicker.addEventListener('change', (e) => {
        currentColor = e.target.value;
      });
    }
    
    if (sizePicker) {
      sizePicker.addEventListener('input', (e) => {
        currentSize = e.target.value;
      });
    }
    
    if (clearBtn) {
      clearBtn.addEventListener('click', clearCanvas);
    }
  }

  function startDrawing(e) {
    isDrawing = true;
    const pos = getMousePos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function draw(e) {
    if (!isDrawing) return;
    
    const pos = getMousePos(e);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = currentSize;
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function stopDrawing() {
    isDrawing = false;
  }

  function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 'mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  }

  function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function initializeForm() {
    form.addEventListener('submit', handleFormSubmit);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const username = formData.get('username');
    const message = formData.get('message');
    
    // Get drawing data if canvas exists
    let drawingData = '';
    if (canvas && !isCanvasBlank()) {
      drawingData = canvas.toDataURL('image/png');
    }
    
    // Validate
    if (!username.trim()) {
      alert('Please enter your name!');
      return;
    }
    
    if (!message.trim() && !drawingData) {
      alert('Please write a message or draw something!');
      return;
    }
    
    // Prepare submission data
    const submissionData = {
      username: username.trim(),
      message: message.trim(),
      drawing: drawingData,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString()
    };
    
    try {
      // For MVP, we'll store in localStorage and also submit to a form service
      await submitToGuestbook(submissionData);
      
      // Store locally for immediate display
      storeEntryLocally(submissionData);
      
      // Show success message
      showSuccessMessage();
      
      // Reset form
      form.reset();
      if (canvas) clearCanvas();
      
      // Reload entries
      loadGuestbookEntries();
      
    } catch (error) {
      console.error('Error submitting guestbook entry:', error);
      alert('Sorry, there was an error submitting your entry. Please try again!');
    }
  }

  function isCanvasBlank() {
    const blank = document.createElement('canvas');
    blank.width = canvas.width;
    blank.height = canvas.height;
    return canvas.toDataURL() === blank.toDataURL();
  }

  async function submitToGuestbook(data) {
    // For MVP, we'll use a simple form service
    // You can replace this with Formspree, Netlify Forms, or similar
    
    // Simulated submission - replace with actual service
    console.log('Submitting guestbook entry:', data);
    
    // Example Formspree submission:
    /*
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Submission failed');
    }
    */
  }

  function storeEntryLocally(data) {
    const entries = getStoredEntries();
    entries.unshift(data); // Add to beginning
    
    // Keep only last 50 entries
    if (entries.length > 50) {
      entries.length = 50;
    }
    
    localStorage.setItem('guestbook-entries', JSON.stringify(entries));
  }

  function getStoredEntries() {
    try {
      const stored = localStorage.getItem('guestbook-entries');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading stored entries:', error);
      return [];
    }
  }

  function loadGuestbookEntries() {
    const entries = getStoredEntries();
    displayEntries(entries);
  }

  function displayEntries(entries) {
    if (!entriesContainer) return;
    
    if (entries.length === 0) {
      entriesContainer.innerHTML = `
        <div class="loading-message">
          No entries yet! Be the first to sign the guestbook! 🎉
        </div>
      `;
      return;
    }
    
    const entriesHTML = entries.map(entry => createEntryHTML(entry)).join('');
    entriesContainer.innerHTML = entriesHTML;
  }

  function createEntryHTML(entry) {
    const drawingHTML = entry.drawing ? 
      `<img src="${entry.drawing}" alt="Drawing by ${entry.username}" class="entry-drawing">` : '';
    
    const messageHTML = entry.message ? 
      `<div class="entry-message">${escapeHtml(entry.message)}</div>` : '';
    
    return `
      <div class="guestbook-entry">
        <div class="entry-header">
          <span class="entry-username">${escapeHtml(entry.username)}</span>
          <span class="entry-date">${entry.date || 'Recently'}</span>
        </div>
        ${messageHTML}
        ${drawingHTML}
      </div>
    `;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function showSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
      successMessage.style.display = 'block';
      successMessage.scrollIntoView({ behavior: 'smooth' });
      
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 5000);
    }
  }
});
