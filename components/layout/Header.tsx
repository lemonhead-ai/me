'use client';

import Link from 'next/link';
import { SpotifyMiniWidget } from '../SpotifyMiniWidget';
import { usePathname } from 'next/navigation';
import { m, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { MagneticButton } from '../animations/AdvancedAnimations';
import Image from 'next/image';
import { useAuth, useUser, useClerk } from '@clerk/nextjs';
import { Home01Icon, Settings02Icon, Logout01Icon } from 'hugeicons-react';

// Custom desktop user dropdown with design consistency (Hugeicons, dark overlay, layout)
function DesktopUserDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useUser();
  const { openUserProfile, signOut } = useClerk();

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="relative z-50 flex items-center justify-center w-7 h-7 rounded-full ring-2 ring-border hover:ring-blue-500/60 transition-all overflow-hidden cursor-pointer"
        aria-label="Toggle user menu"
      >
        {user.imageUrl ? (
          <Image
            src={user.imageUrl}
            alt="Profile"
            fill
            sizes="28px"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-secondary" />
        )}
      </button>

      <AnimatePresence>
        {dropdownOpen && (
          <>
            {/* Backdrop to close dropdown when clicking outside */}
            <div
              className="fixed inset-0 z-40 cursor-default"
              onClick={() => setDropdownOpen(false)}
            />
            
            {/* Dropdown Menu */}
            <m.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute right-0 mt-3 w-72 rounded-2xl bg-[rgb(var(--card))] border border-border shadow-2xl p-3 z-50 flex flex-col gap-1"
            >
              {/* User info row */}
              <div className="flex items-center gap-3 px-3 py-2.5 mb-1.5 border-b border-border/55">
                <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-border/50 flex-shrink-0">
                  {user.imageUrl ? (
                    <Image src={user.imageUrl} alt="Profile" fill sizes="32px" className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-secondary" />
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-foreground truncate">{user.fullName ?? user.username}</span>
                  <span className="text-xs text-muted-foreground truncate">{user.primaryEmailAddress?.emailAddress}</span>
                </div>
              </div>

              {/* Menu Items */}
              <Link
                href="/"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors"
              >
                <Home01Icon size={18} className="text-muted-foreground flex-shrink-0" />
                Visit my page
              </Link>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  openUserProfile();
                }}
                className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors cursor-pointer"
              >
                <Settings02Icon size={18} className="text-muted-foreground flex-shrink-0" />
                User preferences
              </button>

              <button
                onClick={() => {
                  setDropdownOpen(false);
                  signOut();
                }}
                className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-500/10 hover:text-red-600 transition-colors cursor-pointer"
              >
                <Logout01Icon size={18} className="text-red-500/70 flex-shrink-0" />
                Sign out
              </button>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
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
  const [blogMenuOpen, setBlogMenuOpen] = useState(false);
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const { openUserProfile } = useClerk();

  // Treat /blog and any /blog/* route as "blog mode" — isolated from personal portfolio
  const isBlogRoute = pathname === '/blog' || pathname.startsWith('/blog/');

  return (
    <>
      <m.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo — blog routes show text brand, otherwise show image logo */}
            {isBlogRoute ? (
              <Link href="/blog" className="flex items-center">
                <m.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative w-52 h-18 overflow-hidden"
                >
                  <Image
                    src={images.bloglogo}
                    alt="mrtn.blogs logo"
                    fill
                    sizes="200px"
                    className="object-contain object-left"
                  />
                </m.div>
              </Link>
            ) : (
              <Link href="/" className="flex items-center space-x-2">
                <m.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-28 h-18 overflow-hidden"
                >
                  <Image
                    src={images.logo}
                    alt="Logo"
                    fill
                    sizes="112px"
                    className="object-cover object-center"
                  />
                </m.div>
              </Link>
            )}

            {/* Desktop Navigation */}
            {!isBlogRoute && (
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
            )}
            <div className="space-x-2">
              <SpotifyMiniWidget />
            </div>

            {/* Desktop Theme Switcher & Auth */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeSwitcher />
              
              {isBlogRoute && isSignedIn && <DesktopUserDropdown />}
            </div>

            {/* Mobile — blog routes show profile avatar button, other routes show 2-bar hamburger */}
            {isBlogRoute ? (
              <button
                onClick={() => setBlogMenuOpen(!blogMenuOpen)}
                className="md:hidden relative z-50 flex mr-2 items-center justify-center w-7 h-7 rounded-full ring-2 ring-border hover:ring-blue-500/60 transition-all overflow-hidden"
                aria-label="Toggle blog menu"
              >
                {user?.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt="Profile"
                    fill
                    sizes="28px"
                    className="object-cover"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 text-muted-foreground"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ) : (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden relative z-50 p-2 text-foreground hover:text-primary transition-colors flex flex-col justify-center items-center gap-[6px] w-9 h-9"
                aria-label="Toggle mobile menu"
              >
                <m.span
                  animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                  className="w-5 h-0.5 bg-current rounded-full block"
                />
                <m.span
                  animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                  className="w-5 h-0.5 bg-current rounded-full block"
                />
              </button>
            )}
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
            className="md:hidden fixed top-[56px] md:top-[80px] left-0 right-0 bottom-0 z-50 bg-[rgb(var(--background)_/_0.95)] backdrop-blur-xl border-t border-border overflow-y-auto flex flex-col px-4 sm:px-6"
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

            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Blog mobile menu — toggled by avatar button */}
      <AnimatePresence>
        {blogMenuOpen && (
          <m.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-[56px] left-0 right-0 z-50 bg-[rgb(var(--background)_/_0.95)] backdrop-blur-xl border-b border-border shadow-lg"
          >
            <div className="flex flex-col px-4 py-3 gap-1">
              {/* User info row */}
              {user && (
                <div className="flex items-center gap-3 px-3 py-2 mb-1">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-border flex-shrink-0">
                    {user.imageUrl ? (
                      <Image src={user.imageUrl} alt="Profile" fill sizes="32px" className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-secondary" />
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-foreground truncate">{user.fullName ?? user.username}</span>
                    <span className="text-xs text-muted-foreground truncate">{user.primaryEmailAddress?.emailAddress}</span>
                  </div>
                </div>
              )}

              <Link
                href="/"
                onClick={() => setBlogMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors"
              >
                <Home01Icon size={18} className="text-muted-foreground flex-shrink-0" />
                Visit my page
              </Link>

              {isSignedIn && (
                <button
                  onClick={() => {
                    setBlogMenuOpen(false);
                    openUserProfile();
                  }}
                  className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors"
                >
                  <Settings02Icon size={18} className="text-muted-foreground flex-shrink-0" />
                  User preferences
                </button>
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
