/**
 * Celebration effects module
 * Handles confetti, floating hearts, and success animations
 */

import { gsap } from 'gsap';
import { CONFIG } from '../config.js';

const CONFETTI_COLORS = ['#5c8a6b', '#9CAF88', '#D4A574', '#fff', '#c8e6c9', '#7aa87a'];

let animationId = null;

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
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) {
    console.warn('Confetti canvas not found');
    return;
  }

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];

  // Create confetti pieces
  const confettiCount = CONFIG.animations.confettiCount;
  for (let i = 0; i < confettiCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
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
  const heartCount = CONFIG.animations.heartCount;
  for (let i = 0; i < heartCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      size: 12 + Math.random() * 15,
      color: CONFETTI_COLORS[Math.floor(Math.random() * 2)],
      speed: 0.8 + Math.random() * 1.5,
      wobble: Math.random() * Math.PI * 2,
      type: 'heart',
    });
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      if (p.type === 'heart') {
        ctx.fillStyle = p.color;
        drawHeart(ctx, p.x + Math.sin(p.wobble) * 12, p.y, p.size);
        p.y -= p.speed;
        p.wobble += 0.03;

        // Reset when off screen
        if (p.y < -p.size) {
          p.y = canvas.height + p.size;
          p.x = Math.random() * canvas.width;
        }
      } else {
        // Confetti
        ctx.save();
        ctx.translate(p.x + Math.sin(p.wobble) * 20, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();

        p.y += p.speed;
        p.rotation += p.rotationSpeed;
        p.wobble += 0.02;

        // Reset when off screen
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      }
    });

    animationId = requestAnimationFrame(animate);
  }

  // Handle window resize
  const handleResize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', handleResize);

  // Start animation
  animate();
}

/**
 * Show success screen with GSAP animations
 */
export function showSuccessScreen() {
  const successScreen = document.getElementById('success-screen');
  const successMsg = document.getElementById('success-msg');

  if (!successScreen) {
    console.warn('Success screen not found');
    return;
  }

  // Set success message
  if (successMsg) {
    successMsg.textContent = CONFIG.successMessage;
  }

  // Make visible
  successScreen.classList.add('visible');

  // Animate with GSAP
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
 * Stop celebration animation
 */
export function stopCelebration() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

export default { celebrate, showSuccessScreen, stopCelebration };
