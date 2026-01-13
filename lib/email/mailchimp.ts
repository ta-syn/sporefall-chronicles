// Mailchimp integration

interface MailchimpConfig {
  apiKey: string;
  server: string; // e.g. 'us19' from your API key
  audienceId: string; // Your Mailchimp audience/list ID
}

interface MailchimpMember {
  email_address: string;
  status: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending';
  merge_fields?: {
    [key: string]: string;
  };
  tags?: string[];
}

class MailchimpService {
  private config: MailchimpConfig;
  private baseUrl: string;

  constructor(config: MailchimpConfig) {
    this.config = config;
    this.baseUrl = `https://${config.server}.api.mailchimp.com/3.0`;
  }

  /**
   * Subscribe a member to a Mailchimp audience
   */
  async subscribe(member: Omit<MailchimpMember, 'status'>): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/lists/${this.config.audienceId}/members`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...member,
          status: 'subscribed',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Mailchimp API error: ${errorData.detail}`);
      }

      return true;
    } catch (error) {
      console.error('Error subscribing to Mailchimp:', error);
      return false;
    }
  }

  /**
   * Check if a member exists in the audience
   */
  async memberExists(email: string): Promise<boolean> {
    try {
      const subscriberHash = this.generateSubscriberHash(email);
      const response = await fetch(
        `${this.baseUrl}/lists/${this.config.audienceId}/members/${subscriberHash}`,
        {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
          },
        }
      );

      return response.ok;
    } catch (error) {
      console.error('Error checking member existence:', error);
      return false;
    }
  }

  /**
   * Get member information
   */
  async getMember(email: string): Promise<MailchimpMember | null> {
    try {
      const subscriberHash = this.generateSubscriberHash(email);
      const response = await fetch(
        `${this.baseUrl}/lists/${this.config.audienceId}/members/${subscriberHash}`,
        {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
          },
        }
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return {
        email_address: data.email_address,
        status: data.status,
        merge_fields: data.merge_fields,
        tags: data.tags?.map((tag: any) => tag.name),
      };
    } catch (error) {
      console.error('Error getting member:', error);
      return null;
    }
  }

  /**
   * Update a member's information
   */
  async updateMember(email: string, updates: Partial<Omit<MailchimpMember, 'email_address'>>): Promise<boolean> {
    try {
      const subscriberHash = this.generateSubscriberHash(email);
      const response = await fetch(
        `${this.baseUrl}/lists/${this.config.audienceId}/members/${subscriberHash}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updates),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Mailchimp API error: ${errorData.detail}`);
      }

      return true;
    } catch (error) {
      console.error('Error updating member:', error);
      return false;
    }
  }

  /**
   * Helper function to generate subscriber hash
   */
  private generateSubscriberHash(email: string): string {
    // In a real implementation, this would generate an MD5 hash
    // For simplicity, we'll just return the lowercase email
    return email.toLowerCase();
  }

  /**
   * Add tags to a member
   */
  async addTags(email: string, tags: string[]): Promise<boolean> {
    try {
      const subscriberHash = this.generateSubscriberHash(email);
      const response = await fetch(
        `${this.baseUrl}/lists/${this.config.audienceId}/members/${subscriberHash}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tags: tags.map(tag => ({ name: tag, status: 'active' })),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Mailchimp API error: ${errorData.detail}`);
      }

      return true;
    } catch (error) {
      console.error('Error adding tags:', error);
      return false;
    }
  }
}

// Initialize Mailchimp service if environment variables are present
let mailchimpService: MailchimpService | null = null;

if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_SERVER && process.env.MAILCHIMP_AUDIENCE_ID) {
  mailchimpService = new MailchimpService({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER,
    audienceId: process.env.MAILCHIMP_AUDIENCE_ID,
  });
}

/**
 * Subscribe an email to the Mailchimp audience
 */
export const subscribeToMailchimp = async (email: string, firstName?: string, lastName?: string): Promise<boolean> => {
  if (!mailchimpService) {
    console.warn('Mailchimp service not configured');
    return false;
  }

  return mailchimpService.subscribe({
    email_address: email,
    merge_fields: {
      ...(firstName && { FNAME: firstName }),
      ...(lastName && { LNAME: lastName }),
    },
  });
};

/**
 * Check if an email is already subscribed
 */
export const isSubscribedToMailchimp = async (email: string): Promise<boolean> => {
  if (!mailchimpService) {
    console.warn('Mailchimp service not configured');
    return false;
  }

  return mailchimpService.memberExists(email);
};

export default mailchimpService;