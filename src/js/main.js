/**
 * Main application entry point
 * Valentine's Book - Interactive Digital Experience
 */

import { CONFIG } from '../config.js';
import { buildBookPages, initPageFlip, getPageFlip, getTotalPages, nextPage, prevPage, handleResize } from './book.js';
import { audioManager } from './audio.js';
import { createParticles } from './particles.js';
import { celebrate, showSuccessScreen } from './celebration.js';

// Import styles
import '../styles/main.css';
import '../styles/book.css';
import '../styles/animations.css';

// Track "No" button state
let noAttempts = 0;

// Volume control state
let currentVolume = 0.5;
let isDraggingVolume = false;

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

  // Create background particles
  createParticles();

  // Setup event listeners
  setupEventListeners(pageFlip);

  // Hide loading screen
  hideLoadingScreen();

  console.log('Valentine\'s Book initialized successfully');
}

/**
 * Update the page indicator text
 */
function updatePageIndicator(pageIndex) {
  const indicator = document.getElementById('page-indicator');
  if (!indicator) return;

  const contentPages = CONFIG.pages.length;

  if (pageIndex <= 0) {
    indicator.textContent = 'Cover';
  } else if (pageIndex <= contentPages) {
    indicator.textContent = `Page ${pageIndex} / ${contentPages}`;
  } else {
    indicator.textContent = 'The End';
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

    // Try to start music on first flip
    if (e.data === 1 && !audioManager.hasStarted) {
      audioManager.tryPlayMusic();
    }

    // Check if we've reached the last page (end page)
    // e.data is the page index we're flipping TO
    if (e.data >= totalPages - 1) {
      // Small delay to let the flip animation complete
      setTimeout(() => {
        showQuestionScreen();
      }, 600);
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
      nextPage();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', handleKeydown);

  // Music button
  const musicBtn = document.getElementById('music-btn');
  if (musicBtn) {
    musicBtn.addEventListener('click', handleMusicToggle);
  }

  // Yes button (using event delegation)
  document.addEventListener('click', (e) => {
    if (e.target.id === 'yes-btn') {
      handleYesClick();
    }
  });

  // No button hover (using event delegation with capture)
  document.addEventListener('mouseenter', handleNoHover, true);

  // Back to book button
  const backBtn = document.getElementById('back-to-book-btn');
  if (backBtn) {
    backBtn.addEventListener('click', hideQuestionScreen);
  }

  // Restart button
  const restartBtn = document.getElementById('restart-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      location.reload();
    });
  }

  // Window resize
  window.addEventListener('resize', handleResize);

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
  const volumeFill = document.getElementById('volume-fill');
  const volumeLabel = document.getElementById('volume-label');
  const music = document.getElementById('bg-music');

  if (!volumeDial || !volumeKnob || !music) return;

  // Set initial volume
  updateVolumeUI(currentVolume);
  music.volume = currentVolume;

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
    }
  }

  function updateVolumeFromEvent(e) {
    const rect = volumeDial.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;

    // Calculate position as percentage
    let percentage = (clientX - rect.left) / rect.width;
    percentage = Math.max(0, Math.min(1, percentage));

    currentVolume = percentage;
    music.volume = currentVolume;
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
      nextPage();
      break;
    case 'ArrowLeft':
      e.preventDefault();
      prevPage();
      break;
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
