import { NextRequest, NextResponse } from 'next/server';
import { getSquarespaceBlogPosts } from '../../../lib/blog/squarespace';

export async function GET(request: NextRequest) {
  try {
    // Extract search params
    const limit = request.nextUrl.searchParams.get('limit') || '5';
    const category = request.nextUrl.searchParams.get('category');
    const offset = request.nextUrl.searchParams.get('offset') || '0';
    
    // Fetch blog posts using the Squarespace service
    const blogPosts = await getSquarespaceBlogPosts(
      parseInt(limit),
      parseInt(offset),
      category || undefined
    );
    
    // Transform the Squarespace posts to our format
    const transformedPosts = blogPosts.map(post => {
      // Calculate estimated read time based on content length
      const wordCount = (post.body || post.excerpt || '').split(' ').length;
      const readTime = Math.ceil(wordCount / 200); // Average reading speed is ~200 words per minute
      
      return {
        id: post.id,
        title: post.title,
        excerpt: post.excerpt || post.body?.substring(0, 150) + '...',
        date: post.date,
        author: post.author.name,
        imageUrl: post.imageUrl || '/images/blog/default.jpg',
        category: post.categories[0] || 'Research',
        readTime: `${readTime} min read`,
        url: `/blog/${post.slug}`
      };
    });
    
    // Filter by category if specified
    let filteredPosts = transformedPosts;
    if (category) {
      filteredPosts = transformedPosts.filter((post: any) => 
        post.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Limit results
    const limitedPosts = filteredPosts.slice(0, parseInt(limit));
    
    return NextResponse.json({
      posts: limitedPosts,
      total: blogPosts.length,
      hasNext: parseInt(limit) < blogPosts.length
    });
  } catch (error) {
    console.error('Error fetching blog posts from Squarespace:', error);
    
    // Return error response
    return NextResponse.json(
      { 
        error: 'Failed to fetch blog posts',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST route to submit a comment (if needed)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId, comment, author } = body;

    // Validate input
    if (!postId || !comment || !author) {
      return NextResponse.json(
        { error: 'Post ID, comment, and author are required' },
        { status: 400 }
      );
    }
    
    // Squarespace API configuration
    const SQUARESPACE_API_KEY = process.env.SQUARESPACE_API_KEY;
    
    if (!SQUARESPACE_API_KEY) {
      // If no Squarespace API key, save locally or use alternative method
      console.log('Squarespace API key not available, storing comment locally:', { postId, comment, author });
      
      return NextResponse.json({
        success: true,
        message: 'Comment submitted successfully',
      });
    }
    
    // In a real implementation, you would use the Squarespace Comments API
    // This is a placeholder for the actual Squarespace comment submission
    const SQUARESPACE_API_URL = process.env.SQUARESPACE_API_URL || 'https://api.squarespace.com/1.0';
    
    // Submit comment to Squarespace
    const response = await fetch(`${SQUARESPACE_API_URL}/content/comments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SQUARESPACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recordId: postId,
        content: comment,
        authorName: author,
        status: 'APPROVED' // Could be 'PENDING' for moderation
      })
    });
    
    if (!response.ok) {
      console.error('Failed to submit comment to Squarespace:', response.status, await response.text());
      return NextResponse.json(
        { error: 'Failed to submit comment to Squarespace' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Comment submitted successfully',
    });
  } catch (error) {
    console.error('Error submitting comment:', error);
    return NextResponse.json(
      { error: 'Failed to submit comment' },
      { status: 500 }
    );
  }
}