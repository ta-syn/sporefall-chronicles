export const siteConfig = {
  name: 'Sporefall Chronicles',
  description: 'A mysterious journey through the world of spores and chronicles',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/og`,
  links: {
    twitter: 'https://twitter.com/sporefall',
    github: 'https://github.com/sporefall/chronicles',
    instagram: 'https://instagram.com/sporefall.chronicles',
  },
  author: {
    name: 'Sporefall Team',
    url: 'https://sporefall-chronicles.com',
  },
};

export type SiteConfig = typeof siteConfig;