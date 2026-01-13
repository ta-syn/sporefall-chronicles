// Analytics event definitions

export enum AnalyticsEvent {
  POLL_SUBMITTED = 'poll_submitted',
  POLL_STARTED = 'poll_started',
  POLL_OPTION_SELECTED = 'poll_option_selected',
  EMAIL_CAPTURED = 'email_captured',
  SHARE_CLICKED = 'share_clicked',
  SHARE_COMPLETED = 'share_completed',
  PAGE_VIEW = 'page_view',
  BLOG_VIEWED = 'blog_viewed',
  RESULT_VIEWED = 'result_viewed',
}

export interface AnalyticsEventData {
  [key: string]: any;
}

export interface AnalyticsEventPayload {
  event: AnalyticsEvent;
  data?: AnalyticsEventData;
  timestamp?: Date;
}

export const trackEvent = (payload: AnalyticsEventPayload): void => {
  // In a real application, this would send to your analytics service
  console.log('Analytics Event:', payload);
  
  // Example implementation for Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', payload.event, {
      ...payload.data,
      timestamp: payload.timestamp || new Date(),
    });
  }
  
  // Example implementation for Meta Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', payload.event, payload.data);
  }
};

// Specific event tracking functions
export const trackPollStarted = (): void => {
  trackEvent({
    event: AnalyticsEvent.POLL_STARTED,
    data: {
      page: typeof window !== 'undefined' ? window.location.pathname : '',
    },
  });
};

export const trackPollOptionSelected = (option: string): void => {
  trackEvent({
    event: AnalyticsEvent.POLL_OPTION_SELECTED,
    data: {
      selected_option: option,
    },
  });
};

export const trackPollSubmitted = (email: string): void => {
  trackEvent({
    event: AnalyticsEvent.POLL_SUBMITTED,
    data: {
      email_provided: !!email,
    },
  });
};

export const trackEmailCaptured = (email: string): void => {
  trackEvent({
    event: AnalyticsEvent.EMAIL_CAPTURED,
    data: {
      email: email,
    },
  });
};

export const trackShareClicked = (platform: string): void => {
  trackEvent({
    event: AnalyticsEvent.SHARE_CLICKED,
    data: {
      platform: platform,
      url: typeof window !== 'undefined' ? window.location.href : '',
    },
  });
};

export const trackShareCompleted = (platform: string): void => {
  trackEvent({
    event: AnalyticsEvent.SHARE_COMPLETED,
    data: {
      platform: platform,
      url: typeof window !== 'undefined' ? window.location.href : '',
    },
  });
};

export const trackPageView = (path: string): void => {
  trackEvent({
    event: AnalyticsEvent.PAGE_VIEW,
    data: {
      page_path: path,
      page_title: typeof document !== 'undefined' ? document.title : '',
    },
  });
};