/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: [
      'localhost',
      'images.unsplash.com',
      'via.placeholder.com',
      'example.com', // Replace with your actual image domains
    ],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    // Environment variables will be added via .env.local
  },
  webpack: (config, { isServer }) => {
    // Enable tree shaking for better bundle optimization
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }
    return config;
  },
  async redirects() {
    return [
      // Redirect old routes to new ones if needed
      // {
      //   source: '/old-url',
      //   destination: '/new-url',
      //   permanent: true,
      // },
    ];
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;