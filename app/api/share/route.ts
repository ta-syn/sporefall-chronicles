import { NextRequest, NextResponse } from 'next/server';

// Interface for share event data
interface ShareEvent {
  platform: string;
  url: string;
  userId?: string;
  ip?: string;
  userAgent?: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { platform, url, userId } = body;

    // Validate input
    if (!platform || !url) {
      return NextResponse.json(
        { error: 'Platform and URL are required' },
        { status: 400 }
      );
    }
    
    // Get client information
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
           request.headers.get('x-real-ip') || 
           'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Prepare share event data
    const shareEvent: ShareEvent = {
      platform,
      url,
      userId,
      ip,
      userAgent,
      timestamp: new Date().toISOString(),
    };

    // Log share event
    console.log('Share event:', shareEvent);
    
    // In a real application, you would save to a database
    // Example with a database (pseudo-code):
    // await db.shareEvents.create({
    //   platform,
    //   url,
    //   userId: userId || null,
    //   ip,
    //   userAgent,
    //   createdAt: new Date(),
    // });
    
    // In a real app, you might also want to call your analytics service
    // For example: await analytics.trackShareEvent(shareEvent);
    
    // You could also send to external analytics services
    // Example with Google Analytics Measurement Protocol
    if (process.env.GOOGLE_MEASUREMENT_ID && process.env.GOOGLE_API_SECRET) {
      try {
        await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${process.env.GOOGLE_MEASUREMENT_ID}&api_secret=${process.env.GOOGLE_API_SECRET}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: userId || 'anonymous',
            events: [{
              name: 'share',
              params: {
                platform,
                url,
                ip,
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
      message: 'Share event tracked successfully',
      timestamp: shareEvent.timestamp,
    });
  } catch (error) {
    console.error('Error processing share event:', error);
    return NextResponse.json(
      { error: 'Failed to process share event' },
      { status: 500 }
    );
  }
}

// GET route to get share statistics
export async function GET(request: NextRequest) {
  try {
    // Extract search params if needed
    const platform = request.nextUrl.searchParams.get('platform');
    const startDate = request.nextUrl.searchParams.get('startDate');
    const endDate = request.nextUrl.searchParams.get('endDate');
    
    // In a real application, you would fetch from a database
    // This would typically involve querying a database table with share events
    // Example pseudo-code:
    // const query = { };
    // if (platform) query.platform = platform;
    // if (startDate) query.createdAt = { gte: new Date(startDate) };
    // if (endDate) query.createdAt = { ...query.createdAt, lte: new Date(endDate) };
    // const dbResults = await db.shareEvents.findMany({ where: query });
    
    // For now, return mock data with realistic values
    const shareStats = {
      totalShares: platform ? 
        (platform === 'facebook' ? 1205 : 
         platform === 'twitter' ? 987 : 
         platform === 'instagram' ? 756 : 
         platform === 'linkedin' ? 473 : 3421) 
        : 3421,
      platforms: {
        facebook: 1205,
        twitter: 987,
        instagram: 756,
        linkedin: 473,
      },
      dailyStats: [
        { date: '2023-12-01', shares: 15 },
        { date: '2023-12-02', shares: 23 },
        { date: '2023-12-03', shares: 18 },
        { date: '2023-12-04', shares: 31 },
        { date: '2023-12-05', shares: 27 },
      ],
      trendingUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/results?utm_source=social&utm_medium=share`,
      topSharedUrls: [
        { url: '/results', shareCount: 1250 },
        { url: '/', shareCount: 890 },
        { url: '/poll', shareCount: 670 },
      ],
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(shareStats);
  } catch (error) {
    console.error('Error fetching share stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch share statistics' },
      { status: 500 }
    );
  }
}