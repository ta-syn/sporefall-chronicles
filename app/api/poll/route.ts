import { NextRequest, NextResponse } from 'next/server';

// Interface for poll submission data
interface PollSubmission {
  pollChoice: string;
  email: string;
  ip?: string;
  userAgent?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pollChoice, email } = body;

    // Validate input
    if (!pollChoice || !email) {
      return NextResponse.json(
        { error: 'Poll choice and email are required' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Get client information
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
           request.headers.get('x-real-ip') || 
           'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Extract UTM parameters
    const utmSource = request.headers.get('x-utm-source') || 'direct';
    const utmMedium = request.headers.get('x-utm-medium') || 'organic';
    const utmCampaign = request.headers.get('x-utm-campaign') || 'sporefall-poll';
    
    // Prepare poll submission data
    const pollSubmission: PollSubmission = {
      pollChoice,
      email,
      ip,
      userAgent,
      utmSource,
      utmMedium,
      utmCampaign,
      timestamp: new Date().toISOString(),
    };

    // Log poll submission
    console.log('Poll submission:', pollSubmission);
    
    // In a real application, you would save to a database
    // Example with a database (pseudo-code):
    // await db.pollSubmissions.create({
    //   pollChoice,
    //   email,
    //   ip,
    //   userAgent,
    //   utmSource,
    //   utmMedium,
    //   utmCampaign,
    //   createdAt: new Date(),
    // });
    
    // In a real app, you might want to add email to a mailing list
    // Integrate with Mailchimp, Klaviyo, or SendGrid
    if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_AUDIENCE_ID) {
      try {
        await fetch(`https://${process.env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.MAILCHIMP_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email_address: email,
            status: 'subscribed',
            merge_fields: {
              POLLCHOICE: pollChoice,
            },
          }),
        });
      } catch (mailchimpError) {
        console.error('Error adding to Mailchimp:', mailchimpError);
      }
    }
    
    // Track the poll submission event
    // Example with Google Analytics
    if (process.env.GOOGLE_MEASUREMENT_ID && process.env.GOOGLE_API_SECRET) {
      try {
        await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${process.env.GOOGLE_MEASUREMENT_ID}&api_secret=${process.env.GOOGLE_API_SECRET}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: email, // In real app, use proper client ID
            events: [{
              name: 'poll_submission',
              params: {
                poll_choice: pollChoice,
                utm_source: utmSource,
                utm_medium: utmMedium,
              }
            }]
          })
        });
      } catch (gaError) {
        console.error('Error sending to Google Analytics:', gaError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for participating in the poll!',
      timestamp: pollSubmission.timestamp,
    });
  } catch (error) {
    console.error('Error processing poll submission:', error);
    return NextResponse.json(
      { error: 'Failed to process poll submission' },
      { status: 500 }
    );
  }
}

// GET route to fetch poll results
export async function GET(request: NextRequest) {
  try {
    // Extract search params if needed
    const includeDetails = request.nextUrl.searchParams.get('details') === 'true';
    
    // In a real application, you would fetch from a database
    // This would typically involve aggregating data from a poll submissions table
    // Example pseudo-code:
    // const results = await db.pollSubmissions.groupBy({
    //   by: ['pollChoice'],
    //   _count: true,
    // });
    // const totalVotes = await db.pollSubmissions.count();
    
    // For now, return realistic mock data
    const pollResults = {
      totalVotes: 1248,
      options: [
        { option: 'Ancient Spore Cultivation', votes: 420, percentage: 33.6 },
        { option: 'Natural Evolution Process', votes: 312, percentage: 25.0 },
        { option: 'Extraterrestrial Origin', votes: 287, percentage: 23.0 },
        { option: 'Mythological Explanation', votes: 229, percentage: 18.4 },
      ],
      dailyStats: [
        { date: '2023-12-01', votes: 15 },
        { date: '2023-12-02', votes: 23 },
        { date: '2023-12-03', votes: 18 },
        { date: '2023-12-04', votes: 31 },
        { date: '2023-12-05', votes: 27 },
      ],
      topReferrers: [
        { referrer: 'google.com', votes: 420 },
        { referrer: 'facebook.com', votes: 287 },
        { referrer: 'twitter.com', votes: 229 },
        { referrer: 'direct', votes: 312 },
      ],
      lastUpdated: new Date().toISOString(),
      ...(includeDetails && {
        metadata: {
          pollId: 'sporefall-mystery-2023',
          pollTitle: 'What is the Origin of the Sporefall Phenomenon?',
          pollDescription: 'Help us understand the mysterious spore precipitation events',
          pollStatus: 'active',
          startDate: '2023-11-01',
          endDate: '2023-12-31',
        }
      })
    };

    return NextResponse.json(pollResults);
  } catch (error) {
    console.error('Error fetching poll results:', error);
    return NextResponse.json(
      { error: 'Failed to fetch poll results' },
      { status: 500 }
    );
  }
}