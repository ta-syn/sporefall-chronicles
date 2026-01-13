// SendGrid integration

interface SendGridConfig {
  apiKey: string;
}

interface SendGridMessage {
  to: string | string[];
  from: string;
  subject: string;
  text?: string;
  html?: string;
  templateId?: string;
  dynamicTemplateData?: any;
  attachments?: Attachment[];
}

interface Attachment {
  content: string;
  filename: string;
  type?: string;
  disposition?: 'attachment' | 'inline';
  contentId?: string;
}

class SendGridService {
  private config: SendGridConfig;

  constructor(config: SendGridConfig) {
    this.config = config;
  }

  /**
   * Send an email via SendGrid API
   */
  async send(message: SendGridMessage): Promise<boolean> {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{
            to: Array.isArray(message.to) ? message.to.map(email => ({ email })) : [{ email: message.to }],
          }],
          from: { email: message.from },
          subject: message.subject,
          content: [
            ...(message.text ? [{ type: 'text/plain', value: message.text }] : []),
            ...(message.html ? [{ type: 'text/html', value: message.html }] : []),
          ],
          ...(message.templateId && { template_id: message.templateId }),
          ...(message.dynamicTemplateData && { dynamic_template_data: message.dynamicTemplateData }),
          ...(message.attachments && { attachments: message.attachments }),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`SendGrid API error: ${JSON.stringify(errorData)}`);
      }

      return true;
    } catch (error) {
      console.error('Error sending email with SendGrid:', error);
      return false;
    }
  }

  /**
   * Send a transactional email using a template
   */
  async sendTemplate(
    to: string | string[],
    templateId: string,
    dynamicTemplateData: any,
    from?: string
  ): Promise<boolean> {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{
            to: Array.isArray(to) ? to.map(email => ({ email })) : [{ email: to }],
            dynamic_template_data: dynamicTemplateData,
          }],
          from: { email: from || process.env.SENDGRID_FROM_EMAIL || 'noreply@example.com' },
          template_id: templateId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`SendGrid API error: ${JSON.stringify(errorData)}`);
      }

      return true;
    } catch (error) {
      console.error('Error sending template email:', error);
      return false;
    }
  }

  /**
   * Send a welcome email
   */
  async sendWelcomeEmail(to: string, firstName?: string): Promise<boolean> {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: to }],
            dynamic_template_data: {
              first_name: firstName || 'there',
            },
          }],
          from: { email: process.env.SENDGRID_FROM_EMAIL || 'noreply@example.com' },
          template_id: process.env.SENDGRID_WELCOME_TEMPLATE_ID || 'welcome-template-id',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`SendGrid API error: ${JSON.stringify(errorData)}`);
      }

      return true;
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return false;
    }
  }

  /**
   * Send a notification email
   */
  async sendNotification(
    to: string,
    subject: string,
    content: string
  ): Promise<boolean> {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: to }],
          }],
          from: { email: process.env.SENDGRID_FROM_EMAIL || 'noreply@example.com' },
          subject,
          content: [{
            type: 'text/html',
            value: content,
          }],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`SendGrid API error: ${JSON.stringify(errorData)}`);
      }

      return true;
    } catch (error) {
      console.error('Error sending notification email:', error);
      return false;
    }
  }
}

// Initialize SendGrid service if environment variables are present
let sendGridService: SendGridService | null = null;

if (process.env.SENDGRID_API_KEY) {
  sendGridService = new SendGridService({
    apiKey: process.env.SENDGRID_API_KEY,
  });
}

/**
 * Send an email using SendGrid
 */
export const sendEmail = async (
  to: string,
  subject: string,
  htmlContent: string,
  textContent?: string
): Promise<boolean> => {
  if (!sendGridService) {
    console.warn('SendGrid service not configured');
    return false;
  }

  return sendGridService.send({
    to,
    from: process.env.SENDGRID_FROM_EMAIL || 'noreply@example.com',
    subject,
    html: htmlContent,
    text: textContent,
  });
};

/**
 * Send a welcome email
 */
export const sendWelcomeEmail = async (to: string, firstName?: string): Promise<boolean> => {
  if (!sendGridService) {
    console.warn('SendGrid service not configured');
    return false;
  }

  return sendGridService.sendWelcomeEmail(to, firstName);
};

/**
 * Send a notification email
 */
export const sendNotificationEmail = async (
  to: string,
  subject: string,
  content: string
): Promise<boolean> => {
  if (!sendGridService) {
    console.warn('SendGrid service not configured');
    return false;
  }

  return sendGridService.sendNotification(to, subject, content);
};

/**
 * Send a template email
 */
export const sendTemplateEmail = async (
  to: string,
  templateId: string,
  dynamicTemplateData: any
): Promise<boolean> => {
  if (!sendGridService) {
    console.warn('SendGrid service not configured');
    return false;
  }

  return sendGridService.sendTemplate(to, templateId, dynamicTemplateData);
};

export default sendGridService;