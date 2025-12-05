'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun03Icon,
  Moon02Icon,
  Settings02Icon,
  StarHalfIcon,
  SnowIcon,
  BlurIcon,
  Cancel01Icon,
} from 'hugeicons-react';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../providers/ThemeProvider';
import type { AccentColor, ThemeStyle } from '@/lib/themes';

const DURATION = 0.3;

export function ThemeSwitcher() {
  const { mode, accent, style, toggleMode, setAccent, setStyle, mounted } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
 
  const accents: { color: AccentColor; label: string; hex: string }[] = [
    { color: 'purple', label: 'Purple', hex: '#a855f7' },
    { color: 'blue', label: 'Blue', hex: '#3b82f6' },
    { color: 'green', label: 'Green', hex: '#10b981' },
  ];

  const styles: { style: ThemeStyle; label: string; icon: typeof StarHalfIcon }[] = [
    { style: 'default', label: 'Default', icon: StarHalfIcon },
    { style: 'monochromatic', label: 'Mono-chrome', icon: SnowIcon },
    { style: 'pixelated', label: 'Grainy', icon: BlurIcon },
  ];

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative flex items-center -space-x-1" ref={containerRef}>
      {/* Theme Toggle Button */}
      <motion.button
        onClick={toggleMode}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="p-2 rounded-3xl hover:bg-secondary/50 transition-colors"
        aria-label="Toggle theme"
      >
        {/* Only render icon after mount to prevent hydration mismatch */}
        {mounted && (
          <AnimatePresence mode="wait" initial={false}>
            {mode === 'dark' ? (
              <motion.div
                key="moon"
                initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Moon02Icon size={24} className="text-foreground" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Sun03Icon size={24} className="text-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
        )}
        {/* Render a placeholder during SSR to maintain layout */}
        {!mounted && (
          <div style={{ width: 24, height: 24 }} />
        )}
      </motion.button>

      {/* Settings Button and Overlay */}
      <div className="relative">
        <motion.button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="p-2 rounded-3xl hover:bg-secondary/50 transition-colors"
          aria-label="Open theme settings"
        >
          <Settings02Icon size={24} className="text-foreground" />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: DURATION }}
              className="absolute right-0 mt-2 w-44 p-6 rounded-3xl border border-border
                        bg-background/90 backdrop-blur-xl text-foreground shadow-lg"
              style={{
                zIndex: 50,
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 p-1 rounded-3xl 
                          hover:bg-secondary/50 transition-colors"
                aria-label="Close settings"
              >
                <Cancel01Icon size={20} className="text-foreground" />
              </button>

              {/* Theme Settings Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Accent Color</h3>
                  <div className="flex gap-2">
                    {accents.map(({ color, label, hex }) => (
                      <button
                        key={color}
                        onClick={() => setAccent(color)}
                        className={`w-8 h-8 rounded-3xl transition-transform
                                  ${accent === color ? 'scale-110 ring-2 ring-offset-2 ring-offset-background ring-accent' : ''}
                                  hover:scale-110`}
                        style={{ backgroundColor: hex }}
                        title={label}
                        aria-label={`Select ${label} accent`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Style</h3>
                  <div className="flex gap-2">
                    {styles.map(({ style: styleOption, label, icon: Icon }) => (
                      <button
                        key={styleOption}
                        onClick={() => setStyle(styleOption)}
                        className={`p-2 rounded-3xl transition-colors
                                  ${style === styleOption ? 'bg-accent text-accent-foreground' : 'hover:bg-secondary/50'}`}
                        title={label}
                        aria-label={`Select ${label} style`}
                      >
                        <Icon size={24} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}