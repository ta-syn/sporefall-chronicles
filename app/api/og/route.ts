import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const title = searchParams.get('title') ?? 'Sporefall Chronicles';
    const description = searchParams.get('description') ?? 'A mysterious journey through the world of spores and chronicles';
    const type = searchParams.get('type') ?? 'website';
    
    const svg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0d9488" />
            <stop offset="50%" stop-color="#0f766e" />
            <stop offset="100%" stop-color="#115e59" />
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#gradient)" />
        
        <text x="600" y="250" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="white" text-anchor="middle">
          ${title}
        </text>
        
        <text x="600" y="350" font-family="Arial, sans-serif" font-size="32" fill="#e2e8f0" text-anchor="middle">
          ${description}
        </text>
        
        <text x="600" y="500" font-family="Arial, sans-serif" font-size="24" fill="#94a3b8" text-anchor="middle">
          Sporefall Chronicles • ${type.toUpperCase()}
        </text>
      </svg>`;
    
    return new Response(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, immutable, no-transform, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}