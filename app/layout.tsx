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
