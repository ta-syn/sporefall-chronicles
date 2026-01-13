// Global configuration constants

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
};

export const POLL_CONFIG = {
  MAX_OPTIONS: 6,
  MIN_OPTIONS: 2,
  ANONYMOUS_VOTES: true,
  RESULTS_VISIBLE: true,
  EMAIL_REQUIRED: true,
  ALLOW_UPDATE: false, // Whether users can update their poll choice
};

export const SHARE_CONFIG = {
  TRACK_EVENTS: true,
  OPEN_GRAPH_ENABLED: true,
  DEFAULT_SHARE_MESSAGE: 'Check out this interesting content from Sporefall Chronicles!',
  SUPPORTED_PLATFORMS: ['facebook', 'twitter', 'linkedin', 'whatsapp', 'email'],
};

export const ANALYTICS_CONFIG = {
  ENABLED: process.env.NODE_ENV === 'production',
  DEBUG_MODE: process.env.NODE_ENV !== 'production',
  SUPPORTED_SERVICES: ['google', 'meta'],
};

export const STORAGE_KEYS = {
  POLL_SUBMITTED: 'sporefall_poll_submitted',
  USER_PREFERENCES: 'sporefall_user_preferences',
  CONSENT_TRACKING: 'sporefall_consent_tracking',
  CONSENT_EMAILS: 'sporefall_consent_emails',
  UTM_DATA: 'utm_data',
};

export const VALIDATION_CONFIG = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MAX_EMAIL_LENGTH: 254,
  MIN_PASSWORD_LENGTH: 8,
  MAX_NAME_LENGTH: 50,
};

export const UI_CONFIG = {
  THEME: {
    PRIMARY_COLOR: '#0d9488', // emerald-600
    SECONDARY_COLOR: '#0f766e', // emerald-700
    ACCENT_COLOR: '#115e59', // emerald-800
    BACKGROUND_GRADIENT: 'from-emerald-50 to-teal-100',
  },
  ANIMATION: {
    DURATION: {
      FAST: 200, // ms
      NORMAL: 300, // ms
      SLOW: 500, // ms
    },
    EASING: 'ease-in-out',
  },
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
  },
};

export const SEO_CONFIG = {
  DEFAULT_TITLE: 'Sporefall Chronicles',
  DEFAULT_DESCRIPTION: 'A mysterious journey through the world of spores and chronicles',
  DEFAULT_KEYWORDS: ['sporefall', 'mystery', 'chronicles', 'poll', 'research'],
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  TWITTER_HANDLE: '@sporefall',
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
};

export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  NETWORK_ERROR: 'A network error occurred. Please try again.',
  SERVER_ERROR: 'A server error occurred. Please try again later.',
  POLL_SUBMISSION_ERROR: 'There was an error submitting your poll. Please try again.',
  EMAIL_SUBMISSION_ERROR: 'There was an error saving your email. Please try again.',
};

export const SUCCESS_MESSAGES = {
  POLL_SUBMITTED: 'Thank you for participating in the poll!',
  EMAIL_CAPTURED: 'Your email has been saved successfully!',
  SHARE_SUCCESS: 'Thank you for sharing!',
};

export const POLL_OPTIONS = [
  'Ancient Spore Cultivation',
  'Natural Evolution Process',
  'Extraterrestrial Origin',
  'Mythological Explanation',
  'Scientific Experiment Gone Wrong',
  'Time Distortion Phenomenon',
];

export const SOCIAL_SHARE_TEMPLATES = {
  POLL_RESULTS: {
    title: 'Check out the Sporefall Chronicles Poll Results!',
    description: 'See what the community thinks about the mysteries of the Sporefall phenomenon.',
    hashtags: ['Sporefall', 'Mystery', 'Poll'],
  },
  BLOG_POST: {
    title: 'Interesting read about the Sporefall phenomenon',
    description: 'Discover the latest theories about the mysterious Sporefall event.',
    hashtags: ['Sporefall', 'Research', 'Science'],
  },
  GENERAL: {
    title: 'Sporefall Chronicles - Discover the Mystery',
    description: 'Join our community exploring the ancient spore phenomenon',
    hashtags: ['Sporefall', 'Mystery', 'Science'],
  },
};

export const FORM_CONFIG = {
  DEBOUNCE_DELAY: 300, // ms
  SUBMIT_DELAY: 1000, // ms
  MAX_SUBMIT_ATTEMPTS: 3,
};

export const IMAGE_CONFIG = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  DEFAULT_AVATAR: '/images/default-avatar.png',
};

export const NOTIFICATION_CONFIG = {
  AUTO_CLOSE_DURATION: 5000, // ms
  POSITION: 'bottom-right' as const,
  MAX_VISIBLE: 3,
};

// Function to get config based on environment
export const getConfig = () => {
  return {
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development',
    isBrowser: typeof window !== 'undefined',
    ...ANALYTICS_CONFIG,
    ...POLL_CONFIG,
    ...SHARE_CONFIG,
  };
};

// Export a function to validate environment variables
export const validateEnvironment = (): boolean => {
  const requiredEnvVars = [
    'NEXT_PUBLIC_SITE_URL',
  ];
  
  const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missing.length > 0) {
    console.warn(`Missing required environment variables: ${missing.join(', ')}`);
    return false;
  }
  
  return true;
};

// Initialize validation on module load
if (typeof window === 'undefined') {
  validateEnvironment();
}