// SEO Configuration

export const SEO_CONFIG = {
  default: {
    title: 'Sporefall Chronicles - Discover the Mystery',
    description: 'Join our community exploring the ancient spore phenomenon. Participate in polls and discover the truth behind the Sporefall mystery.',
    keywords: [
      'sporefall',
      'mystery',
      'poll',
      'research',
      'science',
      'phenomenon',
      'chronicles',
      'investigation',
      'discovery',
      'nature'
    ],
    author: 'Sporefall Team',
    siteName: 'Sporefall Chronicles',
    type: 'website',
    locale: 'en_US',
  },
  
  pages: {
    home: {
      title: 'Sporefall Chronicles - Uncover the Ancient Mystery',
      description: 'Embark on a mysterious journey through the world of spores and chronicles. Participate in our community poll to help unravel the Sporefall phenomenon.',
    },
    poll: {
      title: 'Participate in Our Mystery Poll - Sporefall Chronicles',
      description: 'Help us understand the Sporefall phenomenon by participating in our community poll. Your insights contribute to our research.',
    },
    results: {
      title: 'Poll Results - Sporefall Chronicles Investigation',
      description: 'View the latest findings from our community poll about the mysterious Sporefall phenomenon. Share your insights with others.',
    },
    blog: {
      title: 'Blog - Sporefall Chronicles Research',
      description: 'Latest discoveries and theories about the mysterious Sporefall phenomenon. Read articles from researchers and enthusiasts.',
    },
    'blog-post': {
      title: 'Article - Sporefall Chronicles',
      description: 'Read detailed articles about the Sporefall phenomenon from our research team and community contributors.',
    },
  },
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Sporefall Chronicles',
    defaultImage: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/og`,
  },
  
  twitter: {
    card: 'summary_large_image',
    site: '@sporefall',
    creator: '@sporefall',
  },
  
  robots: {
    follow: true,
    index: true,
    googleBot: {
      follow: true,
      index: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  structuredData: {
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/logo.png`,
    socialProfiles: [
      'https://twitter.com/sporefall',
      'https://instagram.com/sporefall.chronicles',
      'https://github.com/sporefall/chronicles',
    ],
  },
  
  canonicalBaseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
};

// Generate SEO props for a specific page
export const getPageSEO = (pageKey: keyof typeof SEO_CONFIG.pages, customOverrides = {}) => {
  const defaultSEO = SEO_CONFIG.default;
  const pageSEO = SEO_CONFIG.pages[pageKey] || {};
  
  return {
    title: pageSEO.title || defaultSEO.title,
    description: pageSEO.description || defaultSEO.description,
    keywords: defaultSEO.keywords,
    ...customOverrides,
  };
};

// Generate Open Graph tags
export const getOpenGraphData = (customOverrides = {}) => {
  return {
    type: SEO_CONFIG.openGraph.type,
    locale: SEO_CONFIG.openGraph.locale,
    siteName: SEO_CONFIG.openGraph.siteName,
    images: [
      {
        url: SEO_CONFIG.openGraph.defaultImage,
        width: 1200,
        height: 630,
        alt: SEO_CONFIG.default.title,
      },
    ],
    ...customOverrides,
  };
};

// Generate Twitter Card tags
export const getTwitterData = (customOverrides = {}) => {
  return {
    card: SEO_CONFIG.twitter.card,
    site: SEO_CONFIG.twitter.site,
    creator: SEO_CONFIG.twitter.creator,
    ...customOverrides,
  };
};

// Generate robots.txt content
export const generateRobotsTxt = () => {
  const { follow, index } = SEO_CONFIG.robots;
  return `User-agent: *
${index ? 'Allow: /' : 'Disallow: /'}
${follow ? '' : 'Disallow: /'}

Sitemap: ${SEO_CONFIG.canonicalBaseUrl}/sitemap.xml`;
};

// Generate sitemap entries
export const generateSitemapEntries = () => {
  return [
    { url: SEO_CONFIG.canonicalBaseUrl, lastmod: new Date().toISOString() },
    { url: `${SEO_CONFIG.canonicalBaseUrl}/poll`, lastmod: new Date().toISOString() },
    { url: `${SEO_CONFIG.canonicalBaseUrl}/results`, lastmod: new Date().toISOString() },
    { url: `${SEO_CONFIG.canonicalBaseUrl}/blog`, lastmod: new Date().toISOString() },
  ];
};

export default SEO_CONFIG;