/**
 * Book module
 * Handles page flip initialization, page generation, and navigation
 */

import { PageFlip } from 'page-flip';
import { CONFIG } from '../config.js';
import { generatePlaceholderSVG } from './placeholders.js';

let pageFlipInstance = null;

/**
 * Generate cover page HTML
 */
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

/**
 * Resolve an image path relative to Vite's base URL
 */
function resolveImagePath(imagePath) {
  if (!imagePath) return '';
  const base = import.meta.env.BASE_URL || '/';
  return base + imagePath;
}

/**
 * Generate content page HTML
 */
function generateContentPage(pageNumber, pageData) {
  const hasText = pageData.text && pageData.text.trim().length > 0;
  const fullImageClass = !hasText && pageData.image ? ' image-full' : '';
  const lazyAttr = pageNumber <= 2 ? '' : ' loading="lazy"';

  const imageSrc = resolveImagePath(pageData.image);
  const imageContent = pageData.image
    ? `<img src="${imageSrc}" alt="Page ${pageNumber}"${lazyAttr} onload="this.classList.add('loaded')" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`
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

/**
 * Generate end page HTML (the last page of the book before the question)
 */
function generateEndPage() {
  return `
    <div class="page end-page" data-density="hard" role="article" aria-label="End of Story">
      <div class="end-page-content">
        <div class="end-decoration" aria-hidden="true">💚</div>
        <p class="end-text">And now, I have a question for you...</p>
        <p class="end-hint">Turn the page to find out 💚</p>
      </div>
    </div>
  `;
}

/**
 * Build all book pages
 */
export function buildBookPages() {
  const bookEl = document.getElementById('book');
  if (!bookEl) {
    console.error('Book container not found');
    return;
  }

  // Clear existing content
  bookEl.innerHTML = '';

  // Add cover
  bookEl.insertAdjacentHTML('beforeend', generateCoverPage());

  // Add content pages
  CONFIG.pages.forEach((pageData, index) => {
    const pageNumber = index + 1;
    bookEl.insertAdjacentHTML('beforeend', generateContentPage(pageNumber, pageData));
  });

  // Add end page (teaser before the big question)
  bookEl.insertAdjacentHTML('beforeend', generateEndPage());
}

/**
 * Get total page count (for detecting last page)
 */
export function getTotalPages() {
  return CONFIG.pages.length + 2; // cover + content pages + end page
}

/**
 * Initialize page flip library
 */
export function initPageFlip() {
  const bookEl = document.getElementById('book');
  if (!bookEl) {
    console.error('Book container not found');
    return null;
  }

  const { width, height, minWidth, maxWidth, minHeight, maxHeight } = CONFIG.book;

  pageFlipInstance = new PageFlip(bookEl, {
    width,
    height,
    size: 'stretch',
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    drawShadow: true,
    flippingTime: CONFIG.animations.pageFlipDuration,
    usePortrait: true,
    showCover: true,
    maxShadowOpacity: 0.5,
    mobileScrollSupport: false,
    clickEventForward: true,
    useMouseEvents: true,
    swipeDistance: 30,
    showPageCorners: true,
  });

  // Load pages
  const pages = document.querySelectorAll('#book .page');
  pageFlipInstance.loadFromHTML(pages);

  return pageFlipInstance;
}

/**
 * Get page flip instance
 */
export function getPageFlip() {
  return pageFlipInstance;
}

/**
 * Go to next page
 */
export function nextPage() {
  if (pageFlipInstance) {
    pageFlipInstance.flipNext();
  }
}

/**
 * Go to previous page
 */
export function prevPage() {
  if (pageFlipInstance) {
    pageFlipInstance.flipPrev();
  }
}

/**
 * Handle window resize
 */
export function handleResize() {
  if (pageFlipInstance) {
    pageFlipInstance.updateFromSize();
  }
}

/**
 * Destroy page flip instance
 */
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
