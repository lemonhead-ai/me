import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress, MouseFollower } from '@/components/animations/AdvancedAnimations';
import { BrowserThemeColor } from '@/components/BrowserThemeColor'; // Add this import

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portfolio - Martin Mwai',
  description: 'Software developer portfolio showcasing projects and skills',
  keywords: ['portfolio', 'software developer', 'web development', 'projects'],
  authors: [{ name: 'Martin Mwai', url: 'https://martinmwai.vercel.app' }],
  openGraph: {
    title: 'Portfolio - Martin Mwai',
    description: 'Software developer portfolio',
    type: 'website',
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f0f' }
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Portfolio'
  },
  manifest: '/manifest.json', // Add this
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Additional meta tags for broader browser support */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-navbutton-color" content="#0f0f0f" />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <BrowserThemeColor /> {/* Add this - updates browser theme dynamically */}
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