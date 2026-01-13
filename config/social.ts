export const socialConfig = {
  platforms: {
    facebook: {
      appId: process.env.FACEBOOK_APP_ID || '',
      pageId: process.env.FACEBOOK_PAGE_ID || '',
    },
    twitter: {
      username: process.env.TWITTER_USERNAME || 'sporefall',
      cardType: 'summary_large_image' as const,
    },
    linkedin: {
      organizationId: process.env.LINKEDIN_ORGANIZATION_ID || '',
    },
  },
  sharing: {
    defaultTitle: 'Sporefall Chronicles - Discover the Mystery',
    defaultDescription: 'Join our community exploring the ancient spore phenomenon',
    defaultHashtags: ['Sporefall', 'Mystery', 'Science'],
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  tracking: {
    facebookPixelId: process.env.FACEBOOK_PIXEL_ID || '',
    twitterPixelId: process.env.TWITTER_PIXEL_ID || '',
    linkedinInsightTagId: process.env.LINKEDIN_INSIGHT_TAG_ID || '',
  },
};

export type SocialConfig = typeof socialConfig;