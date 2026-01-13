// Klaviyo integration

interface KlaviyoConfig {
  apiKey: string;
  listId?: string; // Optional list ID for default list
}

interface KlaviyoProfile {
  email: string;
  firstName?: string;
  lastName?: string;
  phone_number?: string;
  external_id?: string;
  [key: string]: any;
}

interface KlaviyoEvent {
  token: string; // Public token
  event: string;
  customer_properties: KlaviyoProfile;
  properties?: {
    [key: string]: any;
  };
  time?: string; // ISO 8601 timestamp
}

class KlaviyoService {
  private config: KlaviyoConfig;
  private baseUrl = 'https://a.klaviyo.com/api';

  constructor(config: KlaviyoConfig) {
    this.config = config;
  }

  /**
   * Subscribe a profile to a list
   */
  async subscribeToProfile(email: string, firstName?: string, lastName?: string, listId?: string): Promise<boolean> {
    try {
      const payload = {
        data: {
          type: 'profile-subscription-bulk-create-job',
          attributes: {
            profiles: {
              data: [
                {
                  type: 'profile',
                  attributes: {
                    email,
                    ...(firstName && { first_name: firstName }),
                    ...(lastName && { last_name: lastName }),
                  },
                },
              ],
            },
          },
        },
      };

      const response = await fetch(`${this.baseUrl}/v2/list/${listId || this.config.listId}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Klaviyo-API-Key ${this.config.apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Klaviyo API error: ${JSON.stringify(errorData)}`);
      }

      return true;
    } catch (error) {
      console.error('Error subscribing to Klaviyo:', error);
      return false;
    }
  }

  /**
   * Create or update a profile
   */
  async createOrUpdateProfile(profile: KlaviyoProfile): Promise<boolean> {
    try {
      const payload = {
        data: {
          type: 'profile',
          attributes: profile,
        },
      };

      const response = await fetch(`${this.baseUrl}/v2/profiles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Klaviyo-API-Key ${this.config.apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Klaviyo API error: ${JSON.stringify(errorData)}`);
      }

      return true;
    } catch (error) {
      console.error('Error creating or updating profile:', error);
      return false;
    }
  }

  /**
   * Track an event
   */
  async trackEvent(eventData: Omit<KlaviyoEvent, 'token'>): Promise<boolean> {
    try {
      const payload: KlaviyoEvent = {
        token: process.env.NEXT_PUBLIC_KLAVIYO_PUBLIC_TOKEN || '',
        ...eventData,
      };

      const response = await fetch(`${this.baseUrl}/v2/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Klaviyo-API-Key ${this.config.apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Klaviyo API error: ${JSON.stringify(errorData)}`);
      }

      return true;
    } catch (error) {
      console.error('Error tracking event:', error);
      return false;
    }
  }

  /**
   * Get profile by email
   */
  async getProfile(email: string): Promise<KlaviyoProfile | null> {
    try {
      // First, we need to get the profile ID by email
      const searchParams = new URLSearchParams({
        'filter': `email='${email}'`,
      });

      const response = await fetch(`${this.baseUrl}/v2/profiles?${searchParams}`, {
        headers: {
          'Authorization': `Klaviyo-API-Key ${this.config.apiKey}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      if (data.length > 0) {
        return data[0];
      }

      return null;
    } catch (error) {
      console.error('Error getting profile:', error);
      return null;
    }
  }

  /**
   * Update profile properties
   */
  async updateProfile(email: string, updates: Partial<KlaviyoProfile>): Promise<boolean> {
    try {
      const profile = await this.getProfile(email);
      if (!profile) {
        // If profile doesn't exist, create it
        return await this.createOrUpdateProfile({ email, ...updates });
      }

      // Update the profile
      const payload = {
        data: {
          type: 'profile',
          attributes: { ...profile, ...updates },
        },
      };

      const response = await fetch(`${this.baseUrl}/v2/profiles/${profile.external_id || email}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Klaviyo-API-Key ${this.config.apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Klaviyo API error: ${JSON.stringify(errorData)}`);
      }

      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    }
  }
}

// Initialize Klaviyo service if environment variables are present
let klaviyoService: KlaviyoService | null = null;

if (process.env.KLAVIYO_API_KEY && process.env.KLAVIYO_LIST_ID) {
  klaviyoService = new KlaviyoService({
    apiKey: process.env.KLAVIYO_API_KEY,
    listId: process.env.KLAVIYO_LIST_ID,
  });
}

/**
 * Subscribe an email to the Klaviyo list
 */
export const subscribeToKlaviyo = async (email: string, firstName?: string, lastName?: string): Promise<boolean> => {
  if (!klaviyoService) {
    console.warn('Klaviyo service not configured');
    return false;
  }

  return klaviyoService.subscribeToProfile(email, firstName, lastName);
};

/**
 * Track a custom event in Klaviyo
 */
export const trackKlaviyoEvent = async (
  email: string,
  eventName: string,
  properties?: Record<string, any>
): Promise<boolean> => {
  if (!klaviyoService) {
    console.warn('Klaviyo service not configured');
    return false;
  }

  return klaviyoService.trackEvent({
    event: eventName,
    customer_properties: { email },
    properties,
  });
};

/**
 * Update profile with additional information
 */
export const updateKlaviyoProfile = async (
  email: string,
  updates: Partial<KlaviyoProfile>
): Promise<boolean> => {
  if (!klaviyoService) {
    console.warn('Klaviyo service not configured');
    return false;
  }

  return klaviyoService.updateProfile(email, updates);
};

export default klaviyoService;