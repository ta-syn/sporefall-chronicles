import { useEffect } from 'react';
import { 
  trackEvent, 
  trackPageView, 
  trackPollStarted, 
  trackPollOptionSelected, 
  trackPollSubmitted,
  trackEmailCaptured,
  trackShareClicked,
  AnalyticsEvent
} from '../lib/analytics/events';
import { trackPageView as trackGA, trackEvent as trackGAEvent } from '../lib/analytics/ga';
import { trackMetaPageView, trackMetaLead, trackMetaPollComplete } from '../lib/analytics/meta';
import { getFullUtmTrackingObject } from '../lib/utm/parser';

export const useAnalytics = () => {
  // Initialize analytics tracking
  const initializeTracking = () => {
    // Initialize UTM tracking
    // This is handled in the UTM parser module
    
    // Track initial page view
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      trackPageView(path);
      trackGA(path);
      trackMetaPageView();
    }
  };

  // Track page views
  const trackCurrentPageView = (path?: string) => {
    const pagePath = path || (typeof window !== 'undefined' ? window.location.pathname : '/');
    trackPageView(pagePath);
    trackGA(pagePath);
    trackMetaPageView();
  };

  // Track poll events
  const trackPollStart = () => {
    trackPollStarted();
    trackGAEvent('poll_start', { ...getFullUtmTrackingObject() });
  };

  const trackPollOptionSelection = (option: string) => {
    trackPollOptionSelected(option);
    trackGAEvent('poll_option_select', {
      option,
      ...getFullUtmTrackingObject(),
    });
  };

  const trackPollSubmission = (email: string) => {
    trackPollSubmitted(email);
    trackEmailCaptured(email);
    trackGAEvent('poll_submit', {
      email_provided: !!email,
      ...getFullUtmTrackingObject(),
    });
    trackMetaPollComplete({
      value: 1,
      currency: 'USD',
      ...getFullUtmTrackingObject(),
    });
  };

  const trackEmailCapture = (email: string) => {
    trackEmailCaptured(email);
    trackGAEvent('email_capture', {
      email,
      ...getFullUtmTrackingObject(),
    });
    trackMetaLead({
      content_name: 'Email Capture',
      ...getFullUtmTrackingObject(),
    });
  };

  const trackShareClick = (platform: string) => {
    trackShareClicked(platform);
    trackGAEvent('share_click', {
      platform,
      ...getFullUtmTrackingObject(),
    });
  };

  // Generic event tracking
  const trackCustomEvent = (eventName: string, eventData?: Record<string, any>) => {
    trackEvent({
      event: AnalyticsEvent[eventName as keyof typeof AnalyticsEvent] || AnalyticsEvent.PAGE_VIEW,
      data: {
        ...eventData,
        ...getFullUtmTrackingObject(),
      },
    });
    
    // Track in Google Analytics
    trackGAEvent(eventName, {
      ...eventData,
      ...getFullUtmTrackingObject(),
    });
  };

  // Effect to initialize tracking on mount
  useEffect(() => {
    initializeTracking();
  }, []);

  return {
    trackCurrentPageView,
    trackPollStart,
    trackPollOptionSelection,
    trackPollSubmission,
    trackEmailCapture,
    trackShareClick,
    trackCustomEvent,
  };
};