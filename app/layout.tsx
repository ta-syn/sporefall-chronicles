import './globals.css';
import '../styles/variables.css';
import '../styles/themes.css';
import '../styles/component-styles.css';
import '../styles/animations.css';
import type { Metadata } from 'next';
import { Orbitron } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });

export const metadata: Metadata = {
  title: 'Sporefall Chronicles',
  description: 'A mysterious journey through the world of spores and chronicles',
  icons: {
    icon: [
      { url: '/favicon.svg', sizes: 'any' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16' },
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={orbitron.className}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
