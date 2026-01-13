// Application route configuration

export const ROUTES = {
  HOME: '/',
  POLL: '/poll',
  RESULTS: '/results',
  BLOG: '/blog',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms',
};

export const API_ROUTES = {
  POLL: '/api/poll',
  SHARE: '/api/share',
  BLOG: '/api/blog',
  OG: '/api/og',
};

export const EXTERNAL_LINKS = {
  TWITTER: 'https://twitter.com/sporefall',
  INSTAGRAM: 'https://instagram.com/sporefall.chronicles',
  GITHUB: 'https://github.com/sporefall/chronicles',
  LINKEDIN: 'https://linkedin.com/company/sporefall',
};

// Route patterns for dynamic routes
export const DYNAMIC_ROUTE_PATTERNS = {
  BLOG_POST: '/blog/[slug]',
  PRODUCT: '/product/[id]',
  CATEGORY: '/category/[slug]',
};

// Protected routes that require authentication
export const PROTECTED_ROUTES = [
  // Add routes that require authentication
];

// Public routes that don't require authentication
export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.POLL,
  ROUTES.RESULTS,
  ROUTES.BLOG,
  ROUTES.ABOUT,
  ROUTES.CONTACT,
  ROUTES.PRIVACY,
  ROUTES.TERMS,
];

// Routes that should be excluded from analytics tracking
export const EXCLUDED_ANALYTICS_ROUTES = [
  // Add routes to exclude from analytics
];

// Routes that require specific permissions
export const PERMISSION_REQUIRED_ROUTES = {
  // Example: '/admin': 'admin',
};

// Navigation configuration
export const NAVIGATION = [
  {
    name: 'Home',
    href: ROUTES.HOME,
    exact: true,
  },
  {
    name: 'Poll',
    href: ROUTES.POLL,
  },
  {
    name: 'Results',
    href: ROUTES.RESULTS,
  },
  {
    name: 'Blog',
    href: ROUTES.BLOG,
  },
  {
    name: 'About',
    href: ROUTES.ABOUT,
  },
];

// Footer navigation configuration
export const FOOTER_NAVIGATION = [
  {
    title: 'Product',
    items: [
      { name: 'Features', href: '#' },
      { name: 'Poll', href: ROUTES.POLL },
      { name: 'Results', href: ROUTES.RESULTS },
      { name: 'Blog', href: ROUTES.BLOG },
    ],
  },
  {
    title: 'Company',
    items: [
      { name: 'About', href: ROUTES.ABOUT },
      { name: 'Contact', href: ROUTES.CONTACT },
      { name: 'Careers', href: '#' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { name: 'Privacy', href: ROUTES.PRIVACY },
      { name: 'Terms', href: ROUTES.TERMS },
    ],
  },
];

// Social links in navigation
export const SOCIAL_LINKS = [
  {
    name: 'Twitter',
    href: EXTERNAL_LINKS.TWITTER,
    icon: 'twitter',
  },
  {
    name: 'Instagram',
    href: EXTERNAL_LINKS.INSTAGRAM,
    icon: 'instagram',
  },
  {
    name: 'GitHub',
    href: EXTERNAL_LINKS.GITHUB,
    icon: 'github',
  },
];

// Route transition settings
export const TRANSITION_SETTINGS = {
  duration: 300, // ms
  type: 'fade' as const,
};

// Sitemap configuration
export const SITEMAP_ROUTES = [
  { route: ROUTES.HOME, priority: 1.0, changefreq: 'daily' },
  { route: ROUTES.POLL, priority: 0.8, changefreq: 'weekly' },
  { route: ROUTES.RESULTS, priority: 0.9, changefreq: 'daily' },
  { route: ROUTES.BLOG, priority: 0.7, changefreq: 'weekly' },
  { route: ROUTES.ABOUT, priority: 0.5, changefreq: 'monthly' },
  { route: ROUTES.CONTACT, priority: 0.5, changefreq: 'monthly' },
];

export default {
  ROUTES,
  API_ROUTES,
  EXTERNAL_LINKS,
  NAVIGATION,
  FOOTER_NAVIGATION,
  SOCIAL_LINKS,
};