/**
 * Book module
 * Handles page generation and spoiler-free page flip transitions.
 * Replaces the page-flip library with a custom engine that never
 * reveals upcoming pages during animations.
 */

import { CONFIG } from '../config.js';
import { generatePlaceholderSVG } from './placeholders.js';

let pageFlipInstance = null;

/* ================================================================
   Page HTML generators (unchanged)
   ================================================================ */

function generateCoverPage() {
  return `
    <div class="page cover-page" data-density="hard">
      <div class="cover-decoration" aria-hidden="true">💚</div>
      <h1 class="cover-title">${CONFIG.bookTitle}</h1>
      <p class="cover-subtitle">For ${CONFIG.name}</p>
      <p class="cover-hint" aria-hidden="true">Click to begin...</p>
    </div>
  `;
}

function resolveImagePath(imagePath) {
  if (!imagePath) return '';
  const base = import.meta.env.BASE_URL || '/';
  return base + imagePath;
}

function generateContentPage(pageNumber, pageData) {
  const hasText = pageData.text && pageData.text.trim().length > 0;
  const fullImageClass = !hasText && pageData.image ? ' image-full' : '';
  const lazyAttr = pageNumber <= 2 ? '' : ' loading="lazy"';

  const imageSrc = resolveImagePath(pageData.image);
  const imageContent = pageData.image
    ? `<img src="${imageSrc}" alt="Page ${pageNumber}"${lazyAttr}>`
    : '';

  const placeholderSVG = generatePlaceholderSVG(pageNumber);

  const textHtml = hasText
    ? `<p class="page-text">${pageData.text}</p>`
    : '';

  const pageNumHtml = hasText
    ? `<span class="page-number" aria-label="Page ${pageNumber}">${pageNumber}</span>`
    : '';

  return `
    <div class="page content-page${fullImageClass}" role="article" aria-label="Page ${pageNumber}">
      <div class="image-container">
        ${imageContent}
        <div class="image-placeholder" ${pageData.image ? 'style="display:none"' : ''}>
          ${placeholderSVG}
        </div>
      </div>
      ${textHtml}
      ${pageNumHtml}
    </div>
  `;
}

function generateEndPage() {
  return `
    <div class="page end-page" data-density="hard" role="article" aria-label="End of Story">
      <div class="end-page-content">
        <div class="end-decoration" aria-hidden="true">💚</div>
        <p class="end-text">And now, I have a question for you...</p>
        <button class="end-page-btn" id="end-page-btn" type="button">
          I'm ready 💚
        </button>
      </div>
    </div>
  `;
}

/* ================================================================
   Build book pages into #book
   ================================================================ */

export function buildBookPages() {
  const bookEl = document.getElementById('book');
  if (!bookEl) {
    console.error('Book container not found');
    return;
  }

  bookEl.innerHTML = '';

  bookEl.insertAdjacentHTML('beforeend', generateCoverPage());

  CONFIG.pages.forEach((pageData, index) => {
    const pageNumber = index + 1;
    bookEl.insertAdjacentHTML('beforeend', generateContentPage(pageNumber, pageData));
  });

  bookEl.insertAdjacentHTML('beforeend', generateEndPage());

  setupImageHandlers();
}

function setupImageHandlers() {
  const images = document.querySelectorAll('#book .image-container img');
  images.forEach((img) => {
    img.addEventListener('load', () => img.classList.add('loaded'));
    img.addEventListener('error', () => {
      img.style.display = 'none';
      const placeholder = img.nextElementSibling;
      if (placeholder) placeholder.style.display = 'flex';
    });
  });
}

export function getTotalPages() {
  return CONFIG.pages.length + 2; // cover + content + end
}

/* ================================================================
   CustomPageFlip — spoiler-free page transitions
   Only the CURRENT page is ever visible. Future pages are hidden
   until the flip animation completes.
   ================================================================ */

class CustomPageFlip {
  constructor(container, options) {
    this.container = container;
    this.options = options;
    this.pages = [];
    this.wrappers = [];
    this.viewport = null;
    this.currentPage = 0;
    this.isFlipping = false;
    this.events = {};
    this.flipDuration = options.flippingTime || 600;

    // Touch / swipe tracking
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.swipeThreshold = options.swipeDistance || 50;
  }

  /* ---------- Public API (matches page-flip interface) ---------- */

  loadFromHTML(pageElements) {
    this.pages = Array.from(pageElements);
    this._buildDOM();
    this._setupInteraction();
    this.updateSize();
    this._showPage(0);
  }

  flipNext() {
    if (this.isFlipping || this.currentPage >= this.pages.length - 1) return;
    this._doFlip(this.currentPage + 1, 'forward');
  }

  flipPrev() {
    if (this.isFlipping || this.currentPage <= 0) return;
    this._doFlip(this.currentPage - 1, 'backward');
  }

  turnToPage(index) {
    if (index < 0 || index >= this.pages.length) return;
    // Cancel any in-progress flip
    this.isFlipping = false;
    this.wrappers.forEach((w) => {
      w.classList.remove(
        'flip-exit-forward', 'flip-enter-forward',
        'flip-exit-backward', 'flip-enter-backward',
      );
    });
    this._showPage(index);
    this._emit('flip', { data: index });
  }

  on(event, cb) {
    (this.events[event] ||= []).push(cb);
  }

  updateFromSize() {
    this.updateSize();
  }

  updateSize() {
    const parent = this.container.parentElement;
    if (!parent) return;

    const cw = parent.clientWidth;
    const ch = parent.clientHeight;
    const ar = this.options.width / this.options.height;

    let w, h;
    if (cw / ch > ar) {
      h = ch;
      w = h * ar;
    } else {
      w = cw;
      h = w / ar;
    }

    const { minWidth = 0, maxWidth = Infinity, minHeight = 0, maxHeight = Infinity } = this.options;
    w = Math.max(minWidth, Math.min(maxWidth, w));
    h = Math.max(minHeight, Math.min(maxHeight, h));

    this.container.style.width = `${Math.round(w)}px`;
    this.container.style.height = `${Math.round(h)}px`;
  }

  destroy() {
    this.container.innerHTML = '';
    this.pages = [];
    this.wrappers = [];
    this.events = {};
  }

  /* ---------- Internal ---------- */

  _buildDOM() {
    this.container.innerHTML = '';

    this.viewport = document.createElement('div');
    this.viewport.className = 'flip-viewport';

    this.wrappers = this.pages.map((page) => {
      const w = document.createElement('div');
      w.className = 'flip-page-wrapper';
      w.appendChild(page);
      // Every page starts hidden
      w.style.visibility = 'hidden';
      w.style.display = 'none';
      this.viewport.appendChild(w);
      return w;
    });

    this.container.appendChild(this.viewport);
  }

  /** Instantly show exactly one page, hide everything else */
  _showPage(index) {
    this.wrappers.forEach((w, i) => {
      const active = i === index;
      w.style.visibility = active ? 'visible' : 'hidden';
      w.style.display = active ? '' : 'none';
      w.classList.remove(
        'flip-exit-forward', 'flip-enter-forward',
        'flip-exit-backward', 'flip-enter-backward',
      );
    });
    this.currentPage = index;
  }

  /** Two-phase flip: exit current, then enter target */
  _doFlip(target, direction) {
    this.isFlipping = true;

    const curr = this.wrappers[this.currentPage];
    const next = this.wrappers[target];
    const half = this.flipDuration / 2;

    const exitClass = direction === 'forward' ? 'flip-exit-forward' : 'flip-exit-backward';
    const enterClass = direction === 'forward' ? 'flip-enter-forward' : 'flip-enter-backward';

    // --- Phase 1: animate current page out ---
    curr.style.animationDuration = `${half}ms`;
    curr.classList.add(exitClass);

    const onExitEnd = () => {
      curr.removeEventListener('animationend', onExitEnd);
      curr.style.visibility = 'hidden';
      curr.style.display = 'none';
      curr.classList.remove(exitClass);

      // --- Phase 2: animate next page in ---
      next.style.display = '';
      next.style.visibility = 'visible';
      // Force reflow so the browser registers the new display state
      // before the animation class is added.
      void next.offsetHeight;
      next.style.animationDuration = `${half}ms`;
      next.classList.add(enterClass);

      const onEnterEnd = () => {
        next.removeEventListener('animationend', onEnterEnd);
        next.classList.remove(enterClass);
        this.currentPage = target;
        this.isFlipping = false;
        this._emit('flip', { data: target });
      };

      next.addEventListener('animationend', onEnterEnd);
    };

    curr.addEventListener('animationend', onExitEnd);
  }

  _setupInteraction() {
    // --- Touch / swipe ---
    this.viewport.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    }, { passive: true });

    this.viewport.addEventListener('touchend', (e) => {
      if (this.isFlipping) return;
      const dx = e.changedTouches[0].clientX - this.touchStartX;
      const dy = e.changedTouches[0].clientY - this.touchStartY;
      if (Math.abs(dx) > this.swipeThreshold && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) this.flipNext();
        else this.flipPrev();
      }
    }, { passive: true });

    // --- Click to advance ---
    if (this.options.clickEventForward) {
      this.viewport.addEventListener('click', (e) => {
        if (this.isFlipping) return;
        // Don't navigate when clicking interactive elements
        if (e.target.closest('button, a, input, select, textarea, [role="button"]')) return;
        const rect = this.viewport.getBoundingClientRect();
        const x = e.clientX - rect.left;
        if (x > rect.width * 0.5) this.flipNext();
        else this.flipPrev();
      });
    }
  }

  _emit(event, data) {
    (this.events[event] || []).forEach((fn) => fn(data));
  }
}

/* ================================================================
   Public helpers
   ================================================================ */

export function initPageFlip() {
  const bookEl = document.getElementById('book');
  if (!bookEl) {
    console.error('Book container not found');
    return null;
  }

  const { width, height, minWidth, maxWidth, minHeight, maxHeight } = CONFIG.book;

  pageFlipInstance = new CustomPageFlip(bookEl, {
    width,
    height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    flippingTime: CONFIG.animations.pageFlipDuration,
    clickEventForward: true,
    swipeDistance: 30,
  });

  const pages = document.querySelectorAll('#book .page');
  pageFlipInstance.loadFromHTML(pages);

  return pageFlipInstance;
}

export function getPageFlip() {
  return pageFlipInstance;
}

export function nextPage() {
  if (pageFlipInstance) pageFlipInstance.flipNext();
}

export function prevPage() {
  if (pageFlipInstance) pageFlipInstance.flipPrev();
}

export function handleResize() {
  if (pageFlipInstance) pageFlipInstance.updateFromSize();
}

export function destroyPageFlip() {
  if (pageFlipInstance) {
    pageFlipInstance.destroy();
    pageFlipInstance = null;
  }
}

export default {
  buildBookPages,
  initPageFlip,
  getPageFlip,
  getTotalPages,
  nextPage,
  prevPage,
  handleResize,
  destroyPageFlip,
};
