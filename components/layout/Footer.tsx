'use client';

import { motion } from 'framer-motion';
import { Github01Icon, Linkedin02Icon, NewTwitterIcon, Mail01Icon, InstagramIcon } from 'hugeicons-react';
import { HoverScale } from '../animations/AdvancedAnimations';
import Image from 'next/image';

const socialLinks = [
  { name: 'GitHub', icon: Github01Icon, href: 'https://github.com/lemonhead-ai' },
  { name: 'LinkedIn', icon: Linkedin02Icon, href: 'https://www.linkedin.com/in/martinmwai/' },
  { name: 'Instagram', icon: InstagramIcon, href: 'https://www.instagram.com/its._lemonhead/'},
  { name: 'Twitter', icon: NewTwitterIcon, href: 'https://x.com/sacredllemon' },
  { name: 'Email', icon: Mail01Icon, href: 'mailto:martinmwai901@gmail.com' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-20 h-20 rounded-full overflow-hidden" // Circular container
            >
              <Image 
                src="/portlogo.png" 
                alt="Logo" 
                fill 
                className="object-cover object-center" // Fill and center within circle
              />
            </motion.div>



            <p className="text-muted text-sm">
              Building digital experiences with passion and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Projects', 'Contact'].map((item, i) => (
                <motion.li
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
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, i) => (
                <HoverScale key={social.name}>
                  <motion.a
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
                  </motion.a>
                </HoverScale>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-border text-center"
        >
          <p className="text-muted text-sm">
            © {currentYear} martinmwai. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}