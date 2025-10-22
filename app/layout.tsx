import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress, MouseFollower } from '@/components/animations/AdvancedAnimations';

const inter = Inter({ subsets: ['latin'] });

/*export const metadata: Metadata = {
  title: 'Portfolio - Your Name',
  description: 'Software developer portfolio showcasing projects and skills',
  keywords: ['portfolio', 'software developer', 'web development', 'projects'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Portfolio - Your Name',
    description: 'Software developer portfolio',
    type: 'website',
  },
};*/

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <ThemeProvider>
          <ScrollProgress />
          <MouseFollower />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}