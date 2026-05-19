'use client';

import { usePathname } from 'next/navigation';
import { m } from 'framer-motion';
import { SpotifyNowPlaying } from '../SpotifyNowPlaying';
import { Github01Icon, Linkedin02Icon, NewTwitterIcon, Mail01Icon, InstagramIcon } from 'hugeicons-react';
import { HoverScale } from '../animations/AdvancedAnimations';
import Image from 'next/image';
import { images } from '@/lib/images';
import Link from "next/link";

const socialLinks = [
  { name: 'GitHub', icon: Github01Icon, href: 'https://github.com/lemonhead-ai' },
  { name: 'LinkedIn', icon: Linkedin02Icon, href: 'https://www.linkedin.com/in/martinmwai/' },
  { name: 'Instagram', icon: InstagramIcon, href: 'https://www.instagram.com/its._lemonhead/'},
  { name: 'Twitter', icon: NewTwitterIcon, href: 'https://x.com/sacredllemon' },
  { name: 'Email', icon: Mail01Icon, href: 'mailto:martinmwai901@gmail.com' },
];

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const isBlogRoute = pathname === '/blog' || pathname.startsWith('/blog/');

  if (isBlogRoute) {
    return (
      <footer className="border-t border-border bg-background py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted">
          <div className="flex items-center gap-3">
            <Link href="/blog" className="flex items-center">
              <m.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="relative w-36 h-12 overflow-hidden"
              >
                <Image
                  src={images.bloglogo}
                  alt="mrtn.blogs logo"
                  fill
                  sizes="144px"
                  className="object-contain object-left"
                />
              </m.div>
            </Link>
            <span className="text-border">|</span>
            <span className="opacity-60">&copy; {currentYear} Martin Mwai</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-primary transition-colors font-medium">
              Visit my page
            </Link>
            <span className="text-border">|</span>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-primary transition-colors opacity-70 hover:opacity-100"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <m.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-28 h-18 overflow-hidden"
            >
              <Image 
                src={images.logo} 
                alt="Logo" 
                fill 
                className="object-cover object-center" // Fill and center within circle
              />
            </m.div>



            <p className="text-muted text-sm">
              Building digital experiences with passion and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Projects', 'Contact'].map((item, i) => (
                <m.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                > 
                  <a
                    href={`/${item.toLowerCase()}`}
                    className="text-muted hover:text-primary transition-colors text-sm"
                  >
                    {item}
                  </a>
                </m.li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, i) => (
                <HoverScale key={social.name}>
                  <m.a
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon size={20} className="text-primary" />
                  </m.a>
                </HoverScale>
              ))}
            </div>
            <SpotifyNowPlaying />
          </div>
        </div>

        {/* Copyright */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-border text-md opacity-40 flex flex-col md:flex-row justify-between items-center"
        >
          <p>&copy; {currentYear} /mrtn. All rights reserved.</p>
          <div className="flex space-x-4 text-md mt-4 md:mt-0">
            <Link href="/privacy">Buy me Coffee 🍵</Link>
          </div>
        </m.div>
      </div>

      {/** Spotify Now Playing Widget */}
      
    </footer>
  );
}
