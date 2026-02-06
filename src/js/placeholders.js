/**
 * SVG Placeholder Generator
 * Creates beautiful placeholder images for missing page images
 */

// Different romantic/valentine themed SVG patterns
const placeholderThemes = [
  // 1. Hearts pattern
  {
    bg: '#f5e6e8',
    content: `
      <defs>
        <pattern id="hearts1" patternUnits="userSpaceOnUse" width="40" height="40">
          <path d="M20 30 L10 20 Q5 15 10 10 Q15 5 20 12 Q25 5 30 10 Q35 15 30 20 Z" fill="#e8b4b8" opacity="0.6"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hearts1)"/>
      <text x="50%" y="50%" text-anchor="middle" fill="#c9787c" font-size="48" font-family="serif">♥</text>
    `,
  },
  // 2. Flowers
  {
    bg: '#e8f0e8',
    content: `
      <circle cx="50%" cy="50%" r="30" fill="#9CAF88" opacity="0.3"/>
      <circle cx="50%" cy="40%" r="12" fill="#c8e6c9"/>
      <circle cx="40%" cy="50%" r="12" fill="#c8e6c9"/>
      <circle cx="60%" cy="50%" r="12" fill="#c8e6c9"/>
      <circle cx="45%" cy="58%" r="12" fill="#c8e6c9"/>
      <circle cx="55%" cy="58%" r="12" fill="#c8e6c9"/>
      <circle cx="50%" cy="50%" r="8" fill="#D4A574"/>
    `,
  },
  // 3. Stars
  {
    bg: '#e6e8f0',
    content: `
      <text x="30%" y="30%" font-size="24" fill="#9CAF88" opacity="0.7">✦</text>
      <text x="70%" y="25%" font-size="32" fill="#D4A574" opacity="0.8">★</text>
      <text x="50%" y="55%" font-size="48" fill="#9CAF88">✨</text>
      <text x="25%" y="70%" font-size="28" fill="#D4A574" opacity="0.6">⭐</text>
      <text x="75%" y="75%" font-size="20" fill="#9CAF88" opacity="0.7">✦</text>
    `,
  },
  // 4. Leaves
  {
    bg: '#e8f5e9',
    content: `
      <text x="50%" y="35%" font-size="40" fill="#2D5A3D" opacity="0.8">🌿</text>
      <text x="30%" y="55%" font-size="32" fill="#9CAF88">🍃</text>
      <text x="70%" y="60%" font-size="36" fill="#2D5A3D" opacity="0.7">🌱</text>
      <text x="50%" y="75%" font-size="28" fill="#9CAF88" opacity="0.6">🍀</text>
    `,
  },
  // 5. Geometric hearts
  {
    bg: '#faf0f0',
    content: `
      <polygon points="150,100 200,150 150,200 100,150" fill="#e8b4b8" opacity="0.4"/>
      <polygon points="150,120 180,150 150,180 120,150" fill="#c9787c" opacity="0.6"/>
      <text x="50%" y="52%" text-anchor="middle" font-size="28" fill="#9b4d52">❤</text>
    `,
  },
  // 6. Moon and stars
  {
    bg: '#e8e6f0',
    content: `
      <circle cx="40%" cy="40%" r="40" fill="#D4A574" opacity="0.3"/>
      <circle cx="30%" cy="35%" r="35" fill="#e8e6f0"/>
      <text x="65%" y="30%" font-size="20" fill="#9CAF88">✦</text>
      <text x="75%" y="50%" font-size="16" fill="#D4A574">★</text>
      <text x="60%" y="70%" font-size="24" fill="#9CAF88">⭐</text>
      <text x="50%" y="80%" font-size="14" fill="#D4A574">✦</text>
    `,
  },
  // 7. Swirls
  {
    bg: '#f0e8e6',
    content: `
      <path d="M100,150 Q150,100 200,150 T300,150" stroke="#D4A574" stroke-width="3" fill="none" opacity="0.5"/>
      <path d="M80,180 Q130,130 180,180 T280,180" stroke="#9CAF88" stroke-width="2" fill="none" opacity="0.4"/>
      <text x="50%" y="50%" text-anchor="middle" font-size="36" fill="#c9787c">💕</text>
    `,
  },
  // 8. Roses
  {
    bg: '#f5e8e8',
    content: `
      <text x="50%" y="45%" text-anchor="middle" font-size="48">🌹</text>
      <text x="30%" y="65%" font-size="24" opacity="0.7">🌷</text>
      <text x="70%" y="60%" font-size="28" opacity="0.8">🌸</text>
    `,
  },
  // 9. Butterflies
  {
    bg: '#e8f0f5',
    content: `
      <text x="35%" y="35%" font-size="32">🦋</text>
      <text x="65%" y="45%" font-size="40">🦋</text>
      <text x="45%" y="70%" font-size="28" opacity="0.7">🦋</text>
      <circle cx="50%" cy="50%" r="5" fill="#D4A574"/>
    `,
  },
  // 10. Clouds and sun
  {
    bg: '#f0f5f8',
    content: `
      <circle cx="70%" cy="30%" r="25" fill="#D4A574" opacity="0.6"/>
      <ellipse cx="40%" cy="50%" rx="40" ry="20" fill="#fff" opacity="0.8"/>
      <ellipse cx="30%" cy="48%" rx="25" ry="15" fill="#fff" opacity="0.8"/>
      <ellipse cx="50%" cy="48%" rx="30" ry="18" fill="#fff" opacity="0.8"/>
      <text x="50%" y="75%" text-anchor="middle" font-size="24" fill="#9CAF88">☀️</text>
    `,
  },
  // 11. Sparkles
  {
    bg: '#f8f0f5',
    content: `
      <text x="25%" y="25%" font-size="20">✨</text>
      <text x="75%" y="20%" font-size="24">💫</text>
      <text x="50%" y="50%" text-anchor="middle" font-size="48">⭐</text>
      <text x="20%" y="70%" font-size="18">✨</text>
      <text x="80%" y="75%" font-size="22">💫</text>
      <text x="50%" y="85%" font-size="16">✨</text>
    `,
  },
  // 12. Birds
  {
    bg: '#e8f0e8',
    content: `
      <text x="30%" y="35%" font-size="36">🕊️</text>
      <text x="65%" y="45%" font-size="28">🐦</text>
      <text x="50%" y="70%" text-anchor="middle" font-size="20" fill="#9CAF88">~ ~ ~</text>
    `,
  },
  // 13. Candles
  {
    bg: '#f5f0e8',
    content: `
      <rect x="45%" y="50%" width="10%" height="30%" fill="#D4A574"/>
      <ellipse cx="50%" cy="48%" rx="8%" ry="4%" fill="#D4A574"/>
      <ellipse cx="50%" cy="42%" rx="4%" ry="8%" fill="#ffcc00" opacity="0.8"/>
      <ellipse cx="50%" cy="38%" rx="2%" ry="5%" fill="#ff9900"/>
      <text x="30%" y="70%" font-size="16">✨</text>
      <text x="70%" y="65%" font-size="14">✨</text>
    `,
  },
  // 14. Music notes
  {
    bg: '#f0e8f0',
    content: `
      <text x="30%" y="35%" font-size="28" fill="#9CAF88">♪</text>
      <text x="55%" y="45%" font-size="36" fill="#D4A574">♫</text>
      <text x="70%" y="30%" font-size="24" fill="#c9787c">♬</text>
      <text x="40%" y="65%" font-size="32" fill="#9CAF88">♩</text>
      <text x="60%" y="75%" font-size="20" fill="#D4A574">♪</text>
    `,
  },
  // 15. Rings
  {
    bg: '#f8f5f0',
    content: `
      <circle cx="40%" cy="50%" r="30" stroke="#D4A574" stroke-width="6" fill="none"/>
      <circle cx="60%" cy="50%" r="30" stroke="#D4A574" stroke-width="6" fill="none"/>
      <text x="50%" y="80%" text-anchor="middle" font-size="20" fill="#9CAF88">💍</text>
    `,
  },
  // 16. Envelope with heart
  {
    bg: '#f5e8f0',
    content: `
      <rect x="25%" y="35%" width="50%" height="35%" fill="#fff" stroke="#D4A574" stroke-width="2"/>
      <polygon points="150,105 100,140 200,140" fill="#fff" stroke="#D4A574" stroke-width="2"/>
      <polygon points="150,125 100,105 200,105" fill="#faf0f0" stroke="#D4A574" stroke-width="2"/>
      <text x="50%" y="62%" text-anchor="middle" font-size="28" fill="#c9787c">❤</text>
    `,
  },
];

/**
 * Generate an SVG placeholder for a given page number
 */
export function generatePlaceholderSVG(pageNumber) {
  const themeIndex = (pageNumber - 1) % placeholderThemes.length;
  const theme = placeholderThemes[themeIndex];

  return `
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg"
         role="img" aria-label="Decorative illustration for page ${pageNumber}"
         style="width: 100%; height: 100%;">
      <rect width="100%" height="100%" fill="${theme.bg}"/>
      ${theme.content}
    </svg>
  `;
}

export default { generatePlaceholderSVG };
