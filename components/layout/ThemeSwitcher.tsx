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

export function ThemeSwitcher({ variant = 'desktop' }: { variant?: 'desktop' | 'mobile' }) {
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

  if (variant === 'mobile') {
    return (
      <div className="w-full flex flex-col space-y-4">
        {/* Dark Mode Toggle Row */}
        <div className="relative flex w-full p-1.5 bg-secondary/80 border border-border/50 rounded-3xl overflow-hidden shadow-inner">
          {/* Animated Background */}
          <motion.div
            className="absolute top-1.5 bottom-1.5 w-[calc(50%-0.375rem)] bg-background border border-border/50 rounded-full shadow-md"
            animate={{
              x: mode === 'dark' ? '100%' : '0%',
            }}
            transition={{ type: 'spring', stiffness: 450, damping: 35 }}
          />

          <button
            onClick={() => mode !== 'light' && toggleMode()}
            className={`relative flex-1 py-3 text-center text-sm font-semibold transition-colors z-10 ${mode === 'light' ? 'text-foreground' : 'text-foreground/70 hover:text-foreground'
              }`}
            aria-label="Set light mode"
          >
            Light
          </button>

          <button
            onClick={() => mode !== 'dark' && toggleMode()}
            className={`relative flex-1 py-3 text-center text-sm font-semibold transition-colors z-10 ${mode === 'dark' ? 'text-foreground' : 'text-foreground/70 hover:text-foreground'
              }`}
            aria-label="Set dark mode"
          >
            Dark
          </button>
        </div>

        {/* Preferences Accordion */}
        <div className="w-full flex flex-col bg-secondary/20 rounded-2xl overflow-hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full px-4 py-4"
          >
            <span className="text-lg font-medium">Preferences</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
              <Settings02Icon size={24} className="text-foreground/70" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col space-y-6 px-4 pb-6"
              >
                <div className="pt-4 border-t border-border/50">
                  <h3 className="text-sm font-medium mb-3 text-foreground/70 text-center">Accent Color</h3>
                  <div className="flex justify-center gap-4">
                    {accents.map(({ color, label, hex }) => (
                      <button
                        key={color}
                        onClick={() => setAccent(color)}
                        className={`w-10 h-10 rounded-full transition-transform
                                  ${accent === color ? 'scale-110 ring-4 ring-offset-4 ring-offset-background ring-accent' : ''}
                                  hover:scale-110`}
                        style={{ backgroundColor: hex }}
                        title={label}
                        aria-label={`Select ${label} accent`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3 text-foreground/70 text-center">Style</h3>
                  <div className="flex justify-center gap-4">
                    {styles.map(({ style: styleOption, label, icon: Icon }) => (
                      <button
                        key={styleOption}
                        onClick={() => setStyle(styleOption)}
                        className={`p-3 rounded-full transition-colors flex items-center justify-center
                                  ${style === styleOption ? 'bg-accent text-accent-foreground' : 'bg-secondary/50 hover:bg-secondary'}`}
                        title={label}
                        aria-label={`Select ${label} style`}
                      >
                        <Icon size={24} />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

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