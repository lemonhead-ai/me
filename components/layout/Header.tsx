'use client';

import Link from 'next/link';
import { SpotifyMiniWidget } from '../SpotifyMiniWidget';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { MagneticButton } from '../animations/AdvancedAnimations';
import Image from 'next/image';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
  { name: 'FAQ', path: '/contact' },
];


export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-28 h-18 overflow-hidden" // Circular container
              >
                <Image
                  src="/portlogo.png"
                  alt="Logo"
                  fill
                  className="object-cover object-center" // Fill and center within circle
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <MagneticButton key={item.path}>
                  <Link href={item.path}>
                    <motion.div
                      className={`px-4 py-2 rounded-lg transition-colors relative ${pathname === item.path
                        ? 'text-primary'
                        : 'text-foreground hover:text-primary'
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                      {pathname === item.path && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                </MagneticButton>
              ))}
            </div>
            <div className="space-x-2">
              <SpotifyMiniWidget />
            </div>

            {/* Desktop Theme Switcher */}
            <div className="hidden md:flex items-center -space-x-1">
              <ThemeSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative z-50 p-2 text-foreground hover:text-primary transition-colors flex flex-col justify-center items-center gap-[5px] w-10 h-10"
              aria-label="Toggle mobile menu"
            >
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-current rounded-full block"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-current rounded-full block"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-current rounded-full block"
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-[80px] left-0 right-0 bottom-0 z-50 bg-background/95 backdrop-blur-xl border-t border-border overflow-y-auto flex flex-col px-4 sm:px-6"
          >
            <div className="flex-1 space-y-1 mt-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-colors ${pathname === item.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground hover:bg-secondary'
                      }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Theme Switcher */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: navItems.length * 0.1 }}
              className="mt-8 mb-8 pb-8 flex justify-center items-center w-full max-w-sm mx-auto"
            >
              <ThemeSwitcher variant="mobile" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}