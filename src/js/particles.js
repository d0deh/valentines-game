/**
 * Particle system for background floating elements
 */

import { CONFIG } from '../config.js';

const PARTICLE_EMOJIS = ['🌿', '✨', '💚', '🍃', '⭐'];
const PARTICLE_SIZES = ['16px', '20px', '24px', '28px'];

/**
 * Create floating background particles
 */
export function createParticles() {
  const container = document.getElementById('particles');
  if (!container) {
    console.warn('Particles container not found');
    return;
  }

  // Clear existing particles
  container.innerHTML = '';

  const count = CONFIG.animations.particleCount;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.setAttribute('aria-hidden', 'true');

    // Random emoji
    particle.textContent = PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)];

    // Random position
    particle.style.left = `${Math.random() * 100}%`;

    // Random size
    particle.style.fontSize = PARTICLE_SIZES[Math.floor(Math.random() * PARTICLE_SIZES.length)];

    // Random animation timing
    particle.style.animationDelay = `${Math.random() * 10}s`;
    particle.style.animationDuration = `${8 + Math.random() * 6}s`;

    container.appendChild(particle);
  }
}

/**
 * Remove all particles
 */
export function clearParticles() {
  const container = document.getElementById('particles');
  if (container) {
    container.innerHTML = '';
  }
}

export default { createParticles, clearParticles };
