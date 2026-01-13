# Sporefall Chronicles

A Next.js 14 application with advanced features for polls, email capture, social sharing, and commerce integration.

## Features

- **Next.js 14** with App Router
- **Poll functionality** with modal UI
- **Email capture** with Mailchimp/Klaviyo integration
- **Social sharing** with dynamic OG image generation
- **Commerce integration** with Printful
- **Blog integration** with Squarespace
- **Analytics** with Google Analytics and Meta Pixel
- **Animation system** with fade-in and parallax effects
- **Responsive design** with Tailwind CSS
- **Advanced SEO** with comprehensive metadata
- **UTM tracking** for marketing attribution
- **Custom hooks** for business logic
- **Type-safe** with comprehensive TypeScript definitions

## Directory Structure

```
sporefall-chronicles/
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── page.tsx                    # Landing Page 1 (Poll + Email)
│   ├── results/                    # Landing Page 2 (Results + Share)
│   │   ├── page.tsx
│   │   └── loading.tsx
│   └── api/                        # Server-side logic
│       ├── poll/
│       │   └── route.ts            # Save poll + email
│       ├── share/
│       │   └── route.ts            # Track social sharing
│       ├── blog/
│       │   └── route.ts            # Fetch Squarespace blog
│       └── og/
│           └── route.ts            # Dynamic social preview images
├── components/                     # Reusable UI blocks
│   ├── poll/
│   │   ├── PollModal.tsx
│   │   ├── PollOptions.tsx
│   │   └── PollEmail.tsx
│   ├── share/
│   │   ├── ShareButtons.tsx
│   │   ├── ShareCard.tsx
│   │   └── ShareCTA.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── PageWrapper.tsx
│   ├── animation/
│   │   ├── FadeIn.tsx
│   │   ├── ScrollReveal.tsx
│   │   └── Parallax.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Modal.tsx
├── lib/                            # Business logic & integrations
│   ├── analytics/
│   │   ├── events.ts
│   │   ├── ga.ts
│   │   └── meta.ts
│   ├── email/
│   │   ├── mailchimp.ts
│   │   ├── klaviyo.ts
│   │   └── sendgrid.ts
│   ├── commerce/
│   │   ├── printful.ts
│   │   └── products.ts
│   ├── blog/
│   │   └── squarespace.ts
│   ├── utm/
│   │   └── parser.ts
│   └── config.ts
├── hooks/                          # Custom React hooks
│   ├── usePoll.ts
│   ├── useShare.ts
│   ├── useAnalytics.ts
│   └── useUTM.ts
├── types/                          # Type definitions
│   ├── poll.ts
│   ├── share.ts
│   ├── blog.ts
│   └── commerce.ts
├── config/                         # App-wide configuration
│   ├── site.ts
│   ├── seo.ts
│   ├── routes.ts
│   └── social.ts
├── styles/                         # Global & animation styles
│   ├── animations.css
│   ├── themes.css
│   └── variables.css
├── public/                         # Static assets
│   ├── images/
│   ├── fonts/
│   ├── videos/
│   └── favicon.ico
├── middleware.ts                   # Edge logic (UTM, redirects)
└── .env.local                      # Environment variables
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Email Services
MAILCHIMP_API_KEY=
MAILCHIMP_LIST_ID=
KLAVIYO_API_KEY=
KLAVIYO_LIST_ID=
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=
SENDGRID_WELCOME_TEMPLATE_ID=

# Commerce
PRINTFUL_API_KEY=

# Analytics
GA_MEASUREMENT_ID=
META_PIXEL_ID=
FACEBOOK_APP_ID=
LINKEDIN_ORGANIZATION_ID=

# Blog
SQUARESPACE_API_URL=
SQUARESPACE_API_TOKEN=

# Social
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_KLAVIYO_PUBLIC_TOKEN=

# Security
JWT_SECRET=
DATABASE_URL=
```
