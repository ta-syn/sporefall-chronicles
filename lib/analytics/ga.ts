// Google Analytics integration

declare global {
  interface Window {
    gtag: any;
  }
}

export interface GAEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: any;
}

export interface GATrackerConfig {
  trackingId: string;
  debug?: boolean;
}

class GoogleAnalytics {
  private initialized = false;
  private debug = false;

  initialize(trackingId: string, debug = false): void {
    if (typeof window !== 'undefined') {
      this.debug = debug;
      
      // Load gtag script if not already loaded
      if (!window.gtag && !this.initialized) {
        this.loadGtagScript(trackingId);
      }
      
      this.initialized = true;
      
      if (debug) {
        console.log('Google Analytics initialized with tracking ID:', trackingId);
      }
    }
  }

  private loadGtagScript(trackingId: string): void {
    // Create and inject the gtag script
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(gtagScript);

    // Initialize gtag
    const initializeScript = document.createElement('script');
    initializeScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${trackingId}', {
        page_title: document.title,
        page_location: window.location.href,
      });
    `;
    document.head.appendChild(initializeScript);
  }

  pageview(url: string): void {
    if (this.initialized && typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', this.getTrackingId(), {
        page_path: url,
      });
      
      if (this.debug) {
        console.log('GA Pageview:', url);
      }
    }
  }

  event(eventName: string, params?: GAEventParams): void {
    if (this.initialized && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, params);
      
      if (this.debug) {
        console.log('GA Event:', eventName, params);
      }
    }
  }

  setUserId(userId: string): void {
    if (this.initialized && typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', this.getTrackingId(), {
        user_id: userId,
      });
      
      if (this.debug) {
        console.log('GA User ID set:', userId);
      }
    }
  }

  setUserProperties(properties: Record<string, any>): void {
    if (this.initialized && typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', this.getTrackingId(), {
        custom_map: properties,
      });
      
      if (this.debug) {
        console.log('GA User Properties set:', properties);
      }
    }
  }

  private getTrackingId(): string | null {
    if (typeof window !== 'undefined' && window.gtag) {
      // In a real implementation, you would retrieve the tracking ID
      // For now, we'll return a placeholder
      return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
    }
    return null;
  }

  isInitialized(): boolean {
    return this.initialized;
  }
}

export const ga = new GoogleAnalytics();

// Convenience functions
export const trackPageView = (url: string): void => {
  ga.pageview(url);
};

export const trackEvent = (name: string, params?: GAEventParams): void => {
  ga.event(name, params);
};

export const trackCustomEvent = (name: string, params?: GAEventParams): void => {
  ga.event(name, {
    ...params,
    event_category: 'custom',
  });
};

export const trackPollEvent = (action: string, params?: GAEventParams): void => {
  ga.event(action, {
    ...params,
    event_category: 'poll',
  });
};

export const trackShareEvent = (action: string, params?: GAEventParams): void => {
  ga.event(action, {
    ...params,
    event_category: 'share',
  });
};