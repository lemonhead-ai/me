import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress, MouseFollower } from '@/components/animations/AdvancedAnimations';
import { BrowserThemeColor } from '@/components/BrowserThemeColor'; // dynamic theme color

const inter = Inter({ subsets: ['latin'] });

// ✅ Metadata (keep everything except themeColor + viewport)
export const metadata: Metadata = {
  title: 'Portfolio - Martin Mwai',
  description:
    'Software developer portfolio showcasing projects, skills and contact information.',
  keywords: ['portfolio', 'software developer', 'web development', 'projects'],
  authors: [{ name: 'Martin Mwai J.', url: 'https://martinmwai.vercel.app' }],
  openGraph: {
    title: 'Portfolio - Martin Mwai',
    description: 'Software developer portfolio',
    type: 'website',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Portfolio',
  },
  manifest: '/manifest.json',
};

// ✅ Move themeColor + viewport here
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f0f' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Additional meta tags for broader browser support */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-navbutton-color" content="#0f0f0f" />
      </head>
      <body
        className={`${inter.className} bg-background text-foreground antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <BrowserThemeColor />
          <ScrollProgress />
          <MouseFollower />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pt-16">
              {children}
              <SpeedInsights />
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
