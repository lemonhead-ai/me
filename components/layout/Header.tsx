'use client';

import Link from 'next/link';
import { SpotifyMiniWidget } from '../SpotifyMiniWidget';
import { usePathname } from 'next/navigation';
import { m, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { MagneticButton } from '../animations/AdvancedAnimations';
import Image from 'next/image';
import { useAuth, SignInButton, UserButton } from '@clerk/nextjs';
import { images } from '@/lib/images';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];


export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();

  return (
    <>
      <m.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <m.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-28 h-18 overflow-hidden" // Circular container
              >
                <Image
                  src={images.logo}
                  alt="Logo"
                  fill
                  sizes="112px"
                  className="object-cover object-center" // Fill and center within circle
                />
              </m.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <MagneticButton key={item.name}>
                  <Link href={item.path}>
                    <m.div
                      className={`px-4 py-2 rounded-lg transition-colors relative ${pathname === item.path
                        ? 'text-blue-500 dark:text-blue-400'
                        : 'text-foreground hover:text-primary'
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                      {pathname === item.path && (
                        <m.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </m.div>
                  </Link>
                </MagneticButton>
              ))}
            </div>
            <div className="space-x-2">
              <SpotifyMiniWidget />
            </div>

            {/* Desktop Theme Switcher & Auth */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeSwitcher />
              
              {isSignedIn && (
                <UserButton />
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative z-50 p-2 text-foreground hover:text-primary transition-colors flex flex-col justify-center items-center gap-[5px] w-10 h-10"
              aria-label="Toggle mobile menu"
            >
              <m.span
                animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-current rounded-full block"
              />
              <m.span
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-current rounded-full block"
              />
              <m.span
                animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-current rounded-full block"
              />
            </button>
          </div>
        </nav>
      </m.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-[80px] left-0 right-0 bottom-0 z-50 bg-background/95 backdrop-blur-xl border-t border-border overflow-y-auto flex flex-col px-4 sm:px-6"
          >
            <div className="flex-1 space-y-1 mt-2">
              {navItems.map((item, index) => (
                <m.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-colors ${pathname === item.path
                      ? 'bg-blue-500/10 text-blue-500 dark:text-blue-400 dark:bg-blue-400/10'
                      : 'text-foreground hover:bg-secondary'
                      }`}
                  >
                    {item.name}
                  </Link>
                </m.div>
              ))}
            </div>

            {/* Mobile Theme Switcher & Auth */}
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: navItems.length * 0.1 }}
              className="mt-4 mb-8 pb-8 flex flex-col justify-center items-center gap-6 w-full max-w-sm mx-auto"
            >
              <ThemeSwitcher variant="mobile" />

              {isSignedIn && (
                <div className="flex items-center gap-3 w-full px-4 py-3 bg-secondary rounded-xl">
                  <UserButton />
                  <span className="text-sm font-medium text-foreground">Manage Account</span>
                </div>
              )}
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
