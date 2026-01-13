import { useState, useEffect } from 'react';
import { 
  getCurrentUtmData, 
  getStoredUtmData, 
  parseUtmParams, 
  storeUtmData, 
  hasUtmParams,
  getFullUtmTrackingObject
} from '../lib/utm/parser';

export const useUTM = () => {
  const [utmData, setUtmData] = useState(getStoredUtmData() || null);
  const [hasParams, setHasParams] = useState(false);

  // Initialize UTM data on component mount
  useEffect(() => {
    // Check if current page has UTM params
    const currentHasParams = hasUtmParams();
    setHasParams(currentHasParams);
    
    // If current page has UTM params, store them
    if (currentHasParams) {
      storeUtmData();
      setUtmData(getCurrentUtmData());
    } else {
      // Otherwise, use stored UTM data
      setUtmData(getStoredUtmData());
    }
  }, []);

  // Get current UTM parameters
  const getCurrentParams = () => {
    if (typeof window !== 'undefined') {
      return parseUtmParams(window.location.href);
    }
    return {};
  };

  // Get full UTM tracking object
  const getTrackingObject = () => {
    return getFullUtmTrackingObject();
  };

  // Check if specific UTM source is present
  const hasSource = (source: string) => {
    const params = getCurrentParams();
    return params.source?.toLowerCase().includes(source.toLowerCase()) || false;
  };

  // Check if specific UTM medium is present
  const hasMedium = (medium: string) => {
    const params = getCurrentParams();
    return params.medium?.toLowerCase().includes(medium.toLowerCase()) || false;
  };

  // Check if specific UTM campaign is present
  const hasCampaign = (campaign: string) => {
    const params = getCurrentParams();
    return params.campaign?.toLowerCase().includes(campaign.toLowerCase()) || false;
  };

  // Reset UTM data
  const resetUtmData = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('utm_data');
      setUtmData(null);
      setHasParams(false);
    }
  };

  return {
    utmData,
    hasParams,
    getCurrentParams,
    getTrackingObject,
    hasSource,
    hasMedium,
    hasCampaign,
    resetUtmData,
  };
};