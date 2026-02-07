/**
 * Main application entry point
 * Valentine's Book - Interactive Digital Experience
 */

import { CONFIG } from '../config.js';
import { buildBookPages, initPageFlip, getPageFlip, getTotalPages, nextPage, prevPage, handleResize } from './book.js';
import { audioManager } from './audio.js';
import { createParticles } from './particles.js';
import { celebrate, showSuccessScreen, stopCelebration } from './celebration.js';

// Import styles
import '../styles/main.css';
import '../styles/book.css';
import '../styles/animations.css';

// Track "No" button state
let noAttempts = 0;

// Volume control state
let currentVolume = 0.5;
let isDraggingVolume = false;

// End page gate — prevents accidental skip
let lastFlipTime = 0;
let isOnEndPage = false;

/**
 * Simple debounce helper
 */
function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

/**
 * Preload images for adjacent pages (called on flip)
 */
function preloadAdjacentImages(currentPageIndex) {
  const pages = CONFIG.pages;
  // Preload next 2 pages (offset by 1 for cover page)
  for (let offset = 1; offset <= 2; offset++) {
    const idx = currentPageIndex - 1 + offset; // -1 because page 0 is cover
    if (idx >= 0 && idx < pages.length && pages[idx].image) {
      const img = new Image();
      const base = import.meta.env.BASE_URL || '/';
      img.src = base + pages[idx].image;
    }
  }
}

/**
 * Initialize the application
 */
function init() {
  // Build book pages
  buildBookPages();

  // Initialize page flip
  const pageFlip = initPageFlip();
  if (!pageFlip) {
    console.error('Failed to initialize page flip');
    return;
  }

  // Initialize audio
  audioManager.init();

  // Restore saved volume from localStorage
  const savedVolume = localStorage.getItem('valentines-book-volume');
  if (savedVolume !== null) {
    currentVolume = parseFloat(savedVolume);
  }

  // Create background particles
  createParticles();

  // Setup event listeners
  setupEventListeners(pageFlip);

  // Hide loading screen
  hideLoadingScreen();

  console.log('Valentine\'s Book initialized successfully');
}

/**
 * Update the page indicator text and announce for screen readers
 */
function updatePageIndicator(pageIndex) {
  const indicator = document.getElementById('page-indicator');
  const announcer = document.getElementById('page-announcer');
  const contentPages = CONFIG.pages.length;

  let text;
  if (pageIndex <= 0) {
    text = 'Cover';
  } else if (pageIndex <= contentPages) {
    text = `Page ${pageIndex} of ${contentPages}`;
  } else {
    text = 'The End';
  }

  if (indicator) {
    indicator.textContent = text;
  }
  // Announce page change to screen readers via aria-live region
  if (announcer) {
    announcer.textContent = text;
  }
}

/**
 * Setup all event listeners
 */
function setupEventListeners(pageFlip) {
  const totalPages = getTotalPages();

  // Page flip events
  pageFlip.on('flip', (e) => {
    audioManager.playPageTurnSound();
    updatePageIndicator(e.data);
    lastFlipTime = Date.now();
    isOnEndPage = (e.data >= totalPages - 1);

    // Preload adjacent images for smooth viewing
    preloadAdjacentImages(e.data);

    // Try to start music on first flip
    if (e.data === 1 && !audioManager.hasStarted) {
      audioManager.tryPlayMusic();
    }
  });

  // Navigation arrows
  const navPrev = document.getElementById('nav-prev');
  const navNext = document.getElementById('nav-next');
  if (navPrev) {
    navPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      prevPage();
    });
  }
  if (navNext) {
    navNext.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isOnEndPage) {
        showQuestionScreen();
      } else {
        nextPage();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', handleKeydown);

  // Music button
  const musicBtn = document.getElementById('music-btn');
  if (musicBtn) {
    musicBtn.addEventListener('click', handleMusicToggle);
  }

  // Yes button and end-page button (using event delegation)
  document.addEventListener('click', (e) => {
    if (e.target.id === 'yes-btn') {
      handleYesClick();
    }
    if (e.target.id === 'end-page-btn' || e.target.closest('#end-page-btn')) {
      // Guard: ignore clicks that arrive during/right after a page flip
      // (clickEventForward causes the flip-click to also hit this button)
      if (Date.now() - lastFlipTime > 900) {
        showQuestionScreen();
      }
    }
  });

  // No button hover (using event delegation with capture)
  document.addEventListener('mouseenter', handleNoHover, true);

  // Back to book button
  const backBtn = document.getElementById('back-to-book-btn');
  if (backBtn) {
    backBtn.addEventListener('click', hideQuestionScreen);
  }

  // Read Again button (soft reset, no page refresh)
  const restartBtn = document.getElementById('restart-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', resetToStart);
  }

  // Window resize (debounced to avoid layout thrashing)
  window.addEventListener('resize', debounce(handleResize, 150));

  // Focus trap for modal overlays
  document.addEventListener('keydown', trapFocus);

  // Volume control
  setupVolumeControl();

  // Set initial page indicator
  updatePageIndicator(0);
}

/**
 * Setup volume control dial
 */
function setupVolumeControl() {
  const volumeDial = document.getElementById('volume-dial');
  const volumeKnob = document.getElementById('volume-knob');

  if (!volumeDial || !volumeKnob) return;

  // Set initial volume (from localStorage or default)
  updateVolumeUI(currentVolume);
  audioManager.setVolume(currentVolume);

  // Mouse/touch events for the dial track (click to set)
  volumeDial.addEventListener('mousedown', handleVolumeStart);
  volumeDial.addEventListener('touchstart', handleVolumeStart, { passive: false });

  // Global mouse/touch move and up events
  document.addEventListener('mousemove', handleVolumeMove);
  document.addEventListener('touchmove', handleVolumeMove, { passive: false });
  document.addEventListener('mouseup', handleVolumeEnd);
  document.addEventListener('touchend', handleVolumeEnd);

  function handleVolumeStart(e) {
    e.preventDefault();
    isDraggingVolume = true;
    volumeDial.classList.add('dragging');
    updateVolumeFromEvent(e);
  }

  function handleVolumeMove(e) {
    if (!isDraggingVolume) return;
    e.preventDefault();
    updateVolumeFromEvent(e);
  }

  function handleVolumeEnd() {
    if (isDraggingVolume) {
      isDraggingVolume = false;
      volumeDial.classList.remove('dragging');
      // Persist volume preference
      localStorage.setItem('valentines-book-volume', String(currentVolume));
    }
  }

  function updateVolumeFromEvent(e) {
    const rect = volumeDial.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;

    // Calculate position as percentage (linear slider)
    let percentage = (clientX - rect.left) / rect.width;
    percentage = Math.max(0, Math.min(1, percentage));

    currentVolume = percentage;
    // Use logarithmic curve for natural-feeling volume
    audioManager.setVolume(percentage);
    updateVolumeUI(percentage);
  }
}

/**
 * Update volume UI elements
 */
function updateVolumeUI(volume) {
  const volumeFill = document.getElementById('volume-fill');
  const volumeKnob = document.getElementById('volume-knob');
  const volumeLabel = document.getElementById('volume-label');

  const percentage = volume * 100;

  if (volumeFill) {
    volumeFill.style.width = `${percentage}%`;
  }
  if (volumeKnob) {
    volumeKnob.style.left = `${percentage}%`;
  }
  if (volumeLabel) {
    volumeLabel.textContent = `${Math.round(percentage)}%`;
  }
}

/**
 * Handle keyboard navigation
 */
function handleKeydown(e) {
  switch (e.code) {
    case 'ArrowRight':
    case 'Space':
      e.preventDefault();
      if (isOnEndPage) {
        showQuestionScreen();
      } else {
        nextPage();
      }
      break;
    case 'ArrowLeft':
      e.preventDefault();
      prevPage();
      break;
    case 'Escape':
      e.preventDefault();
      // Close whichever overlay is open
      if (document.getElementById('success-screen')?.classList.contains('visible')) {
        resetToStart();
      } else if (document.getElementById('question-screen')?.classList.contains('visible')) {
        hideQuestionScreen();
      }
      break;
  }
}

/**
 * Trap Tab focus within a visible modal overlay
 */
function trapFocus(e) {
  const questionScreen = document.getElementById('question-screen');
  const successScreen = document.getElementById('success-screen');

  // Determine which overlay is active
  const activeOverlay = successScreen?.classList.contains('visible')
    ? successScreen
    : questionScreen?.classList.contains('visible')
      ? questionScreen
      : null;

  if (!activeOverlay || e.key !== 'Tab') return;

  const focusable = activeOverlay.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

/**
 * Handle music toggle button
 */
async function handleMusicToggle() {
  const musicBtn = document.getElementById('music-btn');
  const isPlaying = await audioManager.toggleMusic();

  if (musicBtn) {
    musicBtn.textContent = isPlaying ? '🔊' : '🔇';
    musicBtn.setAttribute('aria-label', isPlaying ? 'Mute music' : 'Play music');
  }
}

/**
 * Show the question screen (the big moment)
 */
function showQuestionScreen() {
  const questionScreen = document.getElementById('question-screen');
  const bookContainer = document.querySelector('.book-container');
  const bookFooter = document.getElementById('book-footer');

  if (questionScreen) {
    questionScreen.classList.add('visible');
    questionScreen.setAttribute('aria-hidden', 'false');
    // Auto-focus the Yes button for keyboard users
    const yesBtn = document.getElementById('yes-btn');
    if (yesBtn) {
      setTimeout(() => yesBtn.focus(), 100);
    }
  }
  if (bookContainer) {
    bookContainer.style.opacity = '0';
    bookContainer.style.pointerEvents = 'none';
  }
  if (bookFooter) {
    bookFooter.style.opacity = '0';
  }
}

/**
 * Hide the question screen and go back to book
 */
function hideQuestionScreen() {
  const questionScreen = document.getElementById('question-screen');
  const bookContainer = document.querySelector('.book-container');
  const bookFooter = document.getElementById('book-footer');
  const pageFlip = getPageFlip();

  if (questionScreen) {
    questionScreen.classList.remove('visible');
    questionScreen.setAttribute('aria-hidden', 'true');
  }
  if (bookContainer) {
    bookContainer.style.opacity = '1';
    bookContainer.style.pointerEvents = 'auto';
  }
  if (bookFooter) {
    bookFooter.style.opacity = '1';
  }

  // Go back one page in the book
  if (pageFlip) {
    pageFlip.flipPrev();
  }
}

/**
 * Handle "Yes" button click
 */
function handleYesClick() {
  // Hide question screen first
  const questionScreen = document.getElementById('question-screen');
  if (questionScreen) {
    questionScreen.classList.remove('visible');
  }

  showSuccessScreen();
  celebrate();
  audioManager.playSuccessSound();
}

/**
 * Handle "No" button hover - makes it run away across the entire screen
 * Cycles through messages forever
 */
function handleNoHover(e) {
  if (e.target.id !== 'no-btn') return;

  noAttempts++;
  const btn = e.target;

  // Update text - loops infinitely through all messages
  const texts = CONFIG.noButtonTexts;
  const textIndex = (noAttempts - 1) % texts.length;
  btn.textContent = texts[textIndex];

  // Get viewport dimensions
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const btnRect = btn.getBoundingClientRect();

  // Safe margins from edges
  const marginX = 100;
  const marginY = 80;

  // Calculate random position anywhere on screen (with margins)
  const minX = marginX;
  const maxX = viewportWidth - marginX - btnRect.width;
  const minY = marginY;
  const maxY = viewportHeight - marginY - btnRect.height;

  const newX = minX + Math.random() * (maxX - minX);
  const newY = minY + Math.random() * (maxY - minY);

  // Slight shrink but keep readable (minimum 0.7)
  const shrinkFactor = Math.min(noAttempts * 0.01, 0.3);
  const scale = Math.max(0.7, 1 - shrinkFactor);

  // Use fixed positioning for full screen movement
  btn.style.left = `${newX}px`;
  btn.style.top = `${newY}px`;
  btn.style.transform = `scale(${scale})`;
}

/**
 * Reset everything and go back to the cover (no page refresh)
 */
function resetToStart() {
  // Hide success screen
  const successScreen = document.getElementById('success-screen');
  if (successScreen) {
    successScreen.classList.remove('visible');
    successScreen.style.opacity = '';
  }

  // Hide question screen
  const questionScreen = document.getElementById('question-screen');
  if (questionScreen) {
    questionScreen.classList.remove('visible');
    questionScreen.setAttribute('aria-hidden', 'true');
  }

  // Show book container
  const bookContainer = document.querySelector('.book-container');
  if (bookContainer) {
    bookContainer.style.opacity = '1';
    bookContainer.style.pointerEvents = 'auto';
  }
  const bookFooter = document.getElementById('book-footer');
  if (bookFooter) {
    bookFooter.style.opacity = '1';
  }

  // Stop confetti/celebration
  stopCelebration();
  const canvas = document.getElementById('confetti-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Flip back to cover
  const pf = getPageFlip();
  if (pf) {
    pf.turnToPage(0);
  }

  // Reset state
  noAttempts = 0;
  isOnEndPage = false;
  updatePageIndicator(0);
}

/**
 * Hide loading screen
 */
function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    // Delay for smooth transition
    setTimeout(() => {
      loadingScreen.classList.add('hidden');

      // Remove from DOM after transition
      setTimeout(() => {
        loadingScreen.remove();
      }, 800);
    }, 500);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for potential testing/debugging
export { init };
