/**
 * Configuration file for Valentine's Book
 * Edit these values to personalize your book!
 */

export const CONFIG = {
  // The recipient's name (shown on cover)
  name: "My Love",

  // Message shown on success screen
  successMessage: "I love you so much!",

  // Book title on the cover
  bookTitle: "Our Story",

  // Cover subtitle
  coverSubtitle: "A Journey of Love",

  // Theme colors (CSS variables)
  theme: {
    primary: "#2D5A3D",      // Forest green
    secondary: "#9CAF88",    // Sage
    accent: "#D4A574",       // Gold
    background: "#1a2a1a",   // Dark green
    cream: "#FAF8F0",        // Page color
    mint: "#E8F5E9",         // Light mint
  },

  // Page content - customize each page's text
  // Leave empty string "" to show no text
  pages: [
    { text: "", image: "images/page-01.jpg" },
    { text: "", image: "images/page-02.jpg" },
    { text: "", image: "images/page-03.jpg" },
    { text: "", image: "images/page-04.jpg" },
    { text: "", image: "images/page-05.jpg" },
    { text: "", image: "images/page-06.jpg" },
    { text: "", image: "images/page-07.jpg" },
    { text: "", image: "images/page-08.jpg" },
    { text: "", image: "images/page-09.jpg" },
    { text: "", image: "images/page-10.jpg" },
    { text: "", image: "images/page-11.jpg" },
    { text: "", image: "images/page-12.jpg" },
    { text: "", image: "images/page-13.jpg" },
    { text: "", image: "images/page-14.jpg" },
    { text: "", image: "images/page-15.jpg" },
    { text: "", image: "images/page-16.jpg" },
  ],

  // Animation settings
  animations: {
    pageFlipDuration: 800,      // ms
    particleCount: 25,
    confettiCount: 120,
    heartCount: 15,
  },

  // Audio settings
  audio: {
    musicFile: "music.mp3",     // Place in public/ folder
    pageTurnVolume: 0.25,
    musicVolume: 0.5,
    enableSounds: true,
  },

  // Book dimensions — page-flip stretches to fill container
  // width/height set the aspect ratio (4:5 per page)
  book: {
    width: 800,
    height: 1000,
    minWidth: 280,
    maxWidth: 1400,
    minHeight: 350,
    maxHeight: 1600,
  },

  // "No" button texts when hovering - loops infinitely!
  noButtonTexts: [
    // Stage 1: Polite confusion
    "No",
    "Are you sure?",
    "Really?",
    "Think about it...",
    "Please reconsider?",

    // Stage 2: Gentle pleading
    "Pretty please?",
    "With sugar on top?",
    "I'll be a good boy!",
    "Give me a chance!",
    "Please? 🥺",

    // Stage 3: Begging
    "I'm begging you!",
    "On my knees here!",
    "Have mercy!",
    "Don't do this to me!",
    "I need you!",

    // Stage 4: Desperation
    "What would Lulu Think?",
    "🥺👉👈",
    "I'll do anything!",
    "PLEASE I'M DESPERATE",
    "This button has feelings!",

    // Stage 5: Emotional manipulation
    "You're breaking my heart",
    "I thought we had something",
    "Was it all a lie?",
    "I can't live without you",
    "*sobs uncontrollably*",

    // Stage 6: Bargaining
    "What if I said please x100?",
    "I'll give you chocolate!",
    "Free hugs forever?",
    "I'll do the dishes!",
    "Name your price!",

    // Stage 7: Getting weird
    "Ill force you to love me",
    "You can't escape love",
    "Reem?",
    "I have all day...",
    "Still here btw",

    // Stage 8: Absurd desperation
    "ok but consider: yes",
    "no is just yes spelled wrong",
    "I'm not crying you're crying",
    "Im telling mama",
    "This is my villain origin story",

    // Stage 9: Full chaos
    "REEEEEEEEEEEEEEEEEM",
    "💔💔💔💔💔",
    "why must you hurt me",
    "I'm literally a button",
    "This is button abuse",

    // Stage 10: Last resort
    "Fine. I'll wait.",
    "*stares intensely*",
    "👁️👄👁️",
    "You know you want to",
    "Just click yes already",
    "The yes button misses you",
    "YES IS RIGHT THERE →",
    "I believe in us",
    "Love always wins",
    "...please? 🥺💚",
  ],
};

export default CONFIG;
