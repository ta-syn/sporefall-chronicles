export interface ShareEvent {
  id: string;
  platform: string;
  url: string;
  userId?: string;
  timestamp: string;
  userAgent?: string;
  referrer?: string;
}

export interface ShareStats {
  totalShares: number;
  platforms: {
    [key: string]: number;
  };
  trendingUrl: string;
  lastUpdated: string;
}

export interface SharePlatform {
  id: string;
  name: string;
  icon: string;
  color: string;
  urlTemplate: (url: string, title?: string, description?: string) => string;
}

export interface ShareOptions {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  hashtags?: string[];
  via?: string;
}