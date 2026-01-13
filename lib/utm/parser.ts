// UTM Parser utility

interface UtmParameters {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

interface UtmData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  timestamp: string;
}

/**
 * Parse UTM parameters from URL
 */
export const parseUtmParams = (url: string = typeof window !== 'undefined' ? window.location.href : ''): UtmParameters => {
  const urlObj = new URL(url);
  const utmParams: UtmParameters = {};

  const utmMap = {
    utm_source: 'source',
    utm_medium: 'medium',
    utm_campaign: 'campaign',
    utm_term: 'term',
    utm_content: 'content',
  };

  Object.entries(utmMap).forEach(([utmKey, paramName]) => {
    const value = urlObj.searchParams.get(utmKey);
    if (value) {
      (utmParams as any)[paramName] = value;
    }
  });

  return utmParams;
};

/**
 * Get UTM data from current page
 */
export const getCurrentUtmData = (): UtmData | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const utmParams = parseUtmParams(window.location.href);
  
  // Only return UTM data if at least one parameter is present
  if (!utmParams.source && !utmParams.medium && !utmParams.campaign) {
    return null;
  }

  return {
    utm_source: utmParams.source || '',
    utm_medium: utmParams.medium || '',
    utm_campaign: utmParams.campaign || '',
    utm_term: utmParams.term,
    utm_content: utmParams.content,
    referrer: document.referrer || undefined,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Store UTM data in session storage
 */
export const storeUtmData = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  const utmData = getCurrentUtmData();
  if (utmData) {
    sessionStorage.setItem('utm_data', JSON.stringify(utmData));
  }
};

/**
 * Retrieve stored UTM data
 */
export const getStoredUtmData = (): UtmData | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = sessionStorage.getItem('utm_data');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error parsing stored UTM data:', error);
      return null;
    }
  }
  return null;
};

/**
 * Check if current visit has UTM parameters
 */
export const hasUtmParams = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  const utmParams = parseUtmParams(window.location.href);
  return !!(utmParams.source || utmParams.medium || utmParams.campaign);
};

/**
 * Get UTM source category
 */
export const getUtmSourceCategory = (utmSource: string): string => {
  const source = utmSource.toLowerCase();
  
  if (source.includes('google')) return 'Organic Search';
  if (source.includes('bing')) return 'Organic Search';
  if (source.includes('yahoo')) return 'Organic Search';
  if (source.includes('duckduckgo')) return 'Organic Search';
  
  if (source.includes('facebook') || source.includes('fb')) return 'Social Media';
  if (source.includes('twitter') || source.includes('t.co')) return 'Social Media';
  if (source.includes('linkedin')) return 'Social Media';
  if (source.includes('instagram')) return 'Social Media';
  if (source.includes('pinterest')) return 'Social Media';
  if (source.includes('youtube')) return 'Social Media';
  
  if (source.includes('newsletter') || source.includes('email')) return 'Email Marketing';
  if (source.includes('mailchimp')) return 'Email Marketing';
  if (source.includes('klaviyo')) return 'Email Marketing';
  
  if (source.includes('cpc') || source.includes('adwords') || source.includes('ads')) return 'Paid Search';
  
  return 'Other';
};

/**
 * Get UTM medium category
 */
export const getUtmMediumCategory = (utmMedium: string): string => {
  const medium = utmMedium.toLowerCase();
  
  if (medium.includes('organic')) return 'Organic Search';
  if (medium.includes('cpc') || medium.includes('ppc') || medium.includes('paid')) return 'Paid Search';
  if (medium.includes('social')) return 'Social Media';
  if (medium.includes('email') || medium.includes('newsletter')) return 'Email';
  if (medium.includes('display') || medium.includes('banner')) return 'Display';
  if (medium.includes('affiliate')) return 'Affiliate';
  
  return 'Other';
};

/**
 * Format UTM data for analytics
 */
export const formatUtmForAnalytics = (utmData: UtmData): Record<string, any> => {
  return {
    utm_source: utmData.utm_source,
    utm_medium: utmData.utm_medium,
    utm_campaign: utmData.utm_campaign,
    utm_term: utmData.utm_term,
    utm_content: utmData.utm_content,
    utm_source_category: getUtmSourceCategory(utmData.utm_source),
    utm_medium_category: getUtmMediumCategory(utmData.utm_medium),
    referrer: utmData.referrer,
    utm_timestamp: utmData.timestamp,
  };
};

/**
 * Append UTM parameters to a URL
 */
export const appendUtmToUrl = (
  url: string,
  utmParams: Partial<UtmParameters>
): string => {
  const urlObj = new URL(url);
  
  Object.entries(utmParams).forEach(([key, value]) => {
    if (value) {
      urlObj.searchParams.set(`utm_${key}`, value);
    }
  });
  
  return urlObj.toString();
};

/**
 * Get full UTM tracking object for an event
 */
export const getFullUtmTrackingObject = (): Record<string, any> => {
  const currentUtm = getCurrentUtmData();
  const storedUtm = getStoredUtmData();
  
  // Use current UTM if available, otherwise fall back to stored
  const utmToUse = currentUtm || storedUtm;
  
  if (!utmToUse) {
    return {};
  }
  
  return formatUtmForAnalytics(utmToUse);
};

/**
 * Initialize UTM tracking
 */
export const initializeUtmTracking = (): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  // Store UTM data when page loads if UTM params are present
  if (hasUtmParams()) {
    storeUtmData();
  }
};

// Initialize UTM tracking on module load (if in browser)
if (typeof window !== 'undefined') {
  initializeUtmTracking();
}

/**
 * Clear stored UTM data
 */
export const clearStoredUtmData = (): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('utm_data');
  }
};