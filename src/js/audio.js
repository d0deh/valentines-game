/**
 * Audio management module
 * Handles background music, page turn sounds, and success sounds
 */

import { CONFIG } from '../config.js';

class AudioManager {
  constructor() {
    this.musicElement = null;
    this.isMusicPlaying = false;
    this.isMusicStarted = false;
    this.audioContext = null;
    this._savedVolume = 0.5;
  }

  /**
   * Initialize audio system
   */
  init() {
    this.musicElement = document.getElementById('bg-music');
    if (this.musicElement) {
      // Set correct path using Vite's base URL (fixes GitHub Pages deployment)
      const base = import.meta.env.BASE_URL || '/';
      this.musicElement.src = base + CONFIG.audio.musicFile;
      this.musicElement.volume = CONFIG.audio.musicVolume;
    }

    // Pause audio when tab is hidden, resume when visible
    document.addEventListener('visibilitychange', () => {
      if (!this.musicElement) return;
      if (document.hidden && this.isMusicPlaying) {
        this._savedVolume = this.musicElement.volume;
        this.musicElement.volume = 0;
      } else if (!document.hidden && this.isMusicPlaying) {
        this.musicElement.volume = this._savedVolume;
      }
    });
  }

  /**
   * Get or create AudioContext (lazy initialization)
   */
  getAudioContext() {
    if (!this.audioContext) {
      try {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        console.warn('AudioContext creation failed:', e.message);
        return null;
      }
    }
    // Resume if suspended (browser autoplay policy)
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  /**
   * Play page turn sound using Web Audio API
   */
  playPageTurnSound() {
    if (!CONFIG.audio.enableSounds) return;

    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const duration = 0.15;

      // Create white noise buffer for paper sound
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Generate decaying white noise
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.1));
      }

      // Create audio nodes
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(CONFIG.audio.pageTurnVolume * 0.3, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 2000;

      // Connect nodes
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      // Play sound
      noise.start();
      noise.stop(ctx.currentTime + duration);
    } catch (error) {
      console.warn('Page turn sound failed:', error.message);
    }
  }

  /**
   * Play success melody
   */
  playSuccessSound() {
    if (!CONFIG.audio.enableSounds) return;

    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6

      notes.forEach((freq, i) => {
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();

        oscillator.type = 'sine';
        oscillator.connect(gain);
        gain.connect(ctx.destination);

        const startTime = ctx.currentTime + i * 0.12;
        oscillator.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.35);

        oscillator.start(startTime);
        oscillator.stop(startTime + 0.35);
      });
    } catch (error) {
      console.warn('Success sound failed:', error.message);
    }
  }

  /**
   * Try to start background music
   */
  async tryPlayMusic() {
    if (!this.musicElement) return false;

    try {
      await this.musicElement.play();
      this.isMusicPlaying = true;
      this.isMusicStarted = true;
      return true;
    } catch (error) {
      console.warn('Music autoplay blocked:', error.message);
      return false;
    }
  }

  /**
   * Toggle music playback
   */
  async toggleMusic() {
    if (!this.musicElement) return this.isMusicPlaying;

    if (this.isMusicPlaying) {
      this.musicElement.pause();
      this.isMusicPlaying = false;
    } else {
      try {
        await this.musicElement.play();
        this.isMusicPlaying = true;
        this.isMusicStarted = true;
      } catch (error) {
        console.warn('Music play failed:', error.message);
      }
    }

    return this.isMusicPlaying;
  }

  /**
   * Set volume with logarithmic curve for natural feel
   */
  setVolume(linearValue) {
    if (!this.musicElement) return;
    // Quadratic curve: human hearing is logarithmic
    this.musicElement.volume = Math.pow(linearValue, 2);
    this._savedVolume = this.musicElement.volume;
  }

  /**
   * Check if music is currently playing
   */
  get isPlaying() {
    return this.isMusicPlaying;
  }

  /**
   * Check if music has ever started
   */
  get hasStarted() {
    return this.isMusicStarted;
  }

  /**
   * Cleanup resources
   */
  destroy() {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    if (this.musicElement) {
      this.musicElement.pause();
      this.musicElement = null;
    }
  }
}

// Export singleton instance
export const audioManager = new AudioManager();
export default audioManager;
