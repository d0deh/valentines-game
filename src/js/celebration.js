/**
 * Celebration effects module
 * Handles confetti, floating hearts, and success animations
 */

import { gsap } from 'gsap';
import { CONFIG } from '../config.js';

const CONFETTI_COLORS = ['#5c8a6b', '#9CAF88', '#D4A574', '#fff', '#c8e6c9', '#7aa87a'];

let animationId = null;
let isAnimating = false;
let resizeHandler = null;
let autoStopTimer = null;
let visibilityHandler = null;

/**
 * Check if user prefers reduced motion
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Draw a heart shape on canvas
 */
function drawHeart(ctx, x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y + size * 0.3);
  ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size * 0.3);
  ctx.bezierCurveTo(x - size / 2, y + size * 0.6, x, y + size * 0.9, x, y + size);
  ctx.bezierCurveTo(x, y + size * 0.9, x + size / 2, y + size * 0.6, x + size / 2, y + size * 0.3);
  ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size * 0.3);
  ctx.fill();
}

/**
 * Start celebration animation with confetti and hearts
 */
export function celebrate() {
  // Guard: prevent stacking multiple animations
  if (isAnimating) return;
  // Respect user motion preferences
  if (prefersReducedMotion()) return;

  isAnimating = true;

  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) {
    isAnimating = false;
    return;
  }

  const ctx = canvas.getContext('2d');

  // DPR-aware canvas for crisp rendering on retina
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  ctx.scale(dpr, dpr);

  // Reduce particles on mobile for battery/perf
  const isMobile = window.innerWidth < 768;
  const confettiCount = isMobile ? 60 : CONFIG.animations.confettiCount;
  const heartCount = isMobile ? 8 : CONFIG.animations.heartCount;

  const particles = [];

  // Create confetti pieces
  for (let i = 0; i < confettiCount; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h - h,
      w: 6 + Math.random() * 6,
      h: 4 + Math.random() * 5,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      speed: 1.5 + Math.random() * 2.5,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.12,
      wobble: Math.random() * Math.PI * 2,
      type: 'confetti',
    });
  }

  // Create floating hearts
  for (let i = 0; i < heartCount; i++) {
    particles.push({
      x: Math.random() * w,
      y: h + Math.random() * 100,
      size: 12 + Math.random() * 15,
      color: CONFETTI_COLORS[Math.floor(Math.random() * 2)],
      speed: 0.8 + Math.random() * 1.5,
      wobble: Math.random() * Math.PI * 2,
      type: 'heart',
    });
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, w, h);

    particles.forEach((p) => {
      if (p.type === 'heart') {
        ctx.fillStyle = p.color;
        drawHeart(ctx, p.x + Math.sin(p.wobble) * 12, p.y, p.size);
        p.y -= p.speed;
        p.wobble += 0.03;
        if (p.y < -p.size) {
          p.y = h + p.size;
          p.x = Math.random() * w;
        }
      } else {
        ctx.save();
        ctx.translate(p.x + Math.sin(p.wobble) * 20, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
        p.y += p.speed;
        p.rotation += p.rotationSpeed;
        p.wobble += 0.02;
        if (p.y > h + 20) {
          p.y = -20;
          p.x = Math.random() * w;
        }
      }
    });

    animationId = requestAnimationFrame(animate);
  }

  // Resize handler (properly cleaned up later)
  resizeHandler = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const nw = window.innerWidth;
    const nh = window.innerHeight;
    canvas.width = nw * dpr;
    canvas.height = nh * dpr;
    canvas.style.width = `${nw}px`;
    canvas.style.height = `${nh}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  window.addEventListener('resize', resizeHandler);

  // Pause when tab hidden, resume when visible
  visibilityHandler = () => {
    if (document.hidden) {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    } else if (isAnimating) {
      animate();
    }
  };
  document.addEventListener('visibilitychange', visibilityHandler);

  // Start animation
  animate();

  // Auto-stop after 10 seconds to save battery
  autoStopTimer = setTimeout(() => {
    stopCelebration();
  }, 10000);
}

/**
 * Show success screen with GSAP animations
 */
export function showSuccessScreen() {
  const successScreen = document.getElementById('success-screen');
  const successMsg = document.getElementById('success-msg');

  if (!successScreen) return;

  if (successMsg) {
    successMsg.textContent = CONFIG.successMessage;
  }

  successScreen.classList.add('visible');

  // Respect reduced motion
  if (prefersReducedMotion()) {
    successScreen.style.opacity = '1';
    return;
  }

  gsap.fromTo(
    successScreen,
    { opacity: 0 },
    { opacity: 1, duration: 0.8, ease: 'power2.out' }
  );

  gsap.from('.success-title', {
    scale: 0.5,
    opacity: 0,
    duration: 0.8,
    delay: 0.3,
    ease: 'back.out(1.7)',
  });

  gsap.from('.success-message', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    delay: 0.6,
  });

  gsap.from('.success-hearts', {
    scale: 0,
    duration: 0.5,
    delay: 0.9,
    ease: 'back.out(2)',
  });

  gsap.from('.restart-btn', {
    opacity: 0,
    y: 20,
    duration: 0.5,
    delay: 1.2,
  });
}

/**
 * Stop celebration animation and clean up all listeners
 */
export function stopCelebration() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
    resizeHandler = null;
  }
  if (visibilityHandler) {
    document.removeEventListener('visibilitychange', visibilityHandler);
    visibilityHandler = null;
  }
  if (autoStopTimer) {
    clearTimeout(autoStopTimer);
    autoStopTimer = null;
  }
  isAnimating = false;
}

export default { celebrate, showSuccessScreen, stopCelebration };
