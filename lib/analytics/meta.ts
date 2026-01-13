// Meta Pixel integration

declare global {
  interface Window {
    fbq: any;
  }
}

export interface MetaEventParams {
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  currency?: string;
  value?: number;
  [key: string]: any;
}

export interface MetaTrackerConfig {
  pixelId: string;
  debug?: boolean;
}

class MetaPixel {
  private initialized = false;
  private debug = false;

  initialize(pixelId: string, debug = false): void {
    if (typeof window !== 'undefined') {
      this.debug = debug;
      
      // Load Meta Pixel script if not already loaded
      if (!window.fbq && !this.initialized) {
        this.loadPixelScript(pixelId);
      }
      
      this.initialized = true;
      
      if (debug) {
        console.log('Meta Pixel initialized with ID:', pixelId);
      }
    }
  }

  private loadPixelScript(pixelId: string): void {
    // Create and inject the Meta Pixel script
    const pixelScript = document.createElement('script');
    pixelScript.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
    `;
    document.head.appendChild(pixelScript);

    // Initialize with pixel ID
    const initScript = document.createElement('script');
    initScript.innerHTML = `
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(initScript);
  }

  pageView(): void {
    if (this.initialized && typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
      
      if (this.debug) {
        console.log('Meta Pixel PageView tracked');
      }
    }
  }

  track(event: string, params?: MetaEventParams): void {
    if (this.initialized && typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', event, params);
      
      if (this.debug) {
        console.log('Meta Pixel Event:', event, params);
      }
    }
  }

  trackCustom(event: string, params?: MetaEventParams): void {
    if (this.initialized && typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', event, params);
      
      if (this.debug) {
        console.log('Meta Pixel Custom Event:', event, params);
      }
    }
  }

  trackLead(params?: MetaEventParams): void {
    this.track('Lead', params);
  }

  trackCompleteRegistration(params?: MetaEventParams): void {
    this.track('CompleteRegistration', params);
  }

  trackAddToCart(params?: MetaEventParams): void {
    this.track('AddToCart', params);
  }

  trackPurchase(params?: MetaEventParams): void {
    this.track('Purchase', params);
  }

  enableAutoConfig(): void {
    if (this.initialized && typeof window !== 'undefined' && window.fbq) {
      window.fbq('init', this.getPixelId());
    }
  }

  flush(): void {
    if (this.initialized && typeof window !== 'undefined' && window.fbq) {
      window.fbq('flush');
    }
  }

  private getPixelId(): string | null {
    if (typeof window !== 'undefined' && window.fbq) {
      // In a real implementation, you would retrieve the pixel ID
      // For now, we'll return a placeholder
      return process.env.NEXT_PUBLIC_META_PIXEL_ID || '';
    }
    return null;
  }

  isInitialized(): boolean {
    return this.initialized;
  }
}

export const metaPixel = new MetaPixel();

// Convenience functions for common events
export const trackMetaPageView = (): void => {
  metaPixel.pageView();
};

export const trackMetaLead = (params?: MetaEventParams): void => {
  metaPixel.trackLead(params);
};

export const trackMetaCompleteRegistration = (params?: MetaEventParams): void => {
  metaPixel.trackCompleteRegistration(params);
};

export const trackMetaPollStart = (params?: MetaEventParams): void => {
  metaPixel.track('InitiateCheckout', {
    content_name: 'Poll Start',
    content_category: 'Engagement',
    ...params,
  });
};

export const trackMetaPollComplete = (params?: MetaEventParams): void => {
  metaPixel.track('CompleteRegistration', {
    content_name: 'Poll Complete',
    content_category: 'Engagement',
    ...params,
  });
};

export const trackMetaEmailCapture = (params?: MetaEventParams): void => {
  metaPixel.track('Lead', {
    content_name: 'Email Capture',
    content_category: 'Conversion',
    ...params,
  });
};

export const trackMetaShare = (platform: string, params?: MetaEventParams): void => {
  metaPixel.track('Engagement', {
    content_name: `Share on ${platform}`,
    content_category: 'Social',
    ...params,
  });
};