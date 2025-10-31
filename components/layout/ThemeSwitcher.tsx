'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun03Icon, 
  Moon02Icon, 
  Settings02Icon,
  SparklesIcon,
  CircleIcon,
  FavouriteIcon,
  Cancel01Icon,
  PaintBoardIcon
} from 'hugeicons-react';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../providers/ThemeProvider';
import type { AccentColor, ThemeStyle } from '@/lib/themes';

const DURATION = 0.5;

export function ThemeSwitcher() {
  const { mode, accent, style, toggleMode, setAccent, setStyle } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const accents: { color: AccentColor; label: string; hex: string }[] = [
    { color: 'purple', label: 'Purple', hex: '#a855f7' },
    { color: 'blue', label: 'Blue', hex: '#3b82f6' },
    { color: 'green', label: 'Green', hex: '#10b981' },
  ];

  const styles: { style: ThemeStyle; label: string; icon: typeof SparklesIcon }[] = [
    { style: 'default', label: 'Default', icon: SparklesIcon },
    { style: 'monochromatic', label: 'Mono', icon: CircleIcon },
    { style: 'pixelated', label: 'Grainy', icon: FavouriteIcon },
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

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2">
        <div className="p-2">
          <div className="w-6 h-6" />
        </div>
        <div className="p-2">
          <div className="w-6 h-6" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center space-x-2" ref={containerRef}>
      {/* Mode Toggle Button */}
      <motion.button
        onClick={toggleMode}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-2 transition-colors"
        aria-label="Toggle theme mode"
      >
        <AnimatePresence mode="wait">
          {mode === 'dark' ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon02Icon size={24} className="text-primary" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun03Icon size={24} className="text-primary" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Settings Icon Button */}
      <motion.button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ rotate: 90, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-2 transition-colors"
        aria-label={isOpen ? 'Close settings' : 'Open settings'}
      >
        <Settings02Icon size={24} className="text-primary" />
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: DURATION, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed right-4 top-20 w-64 max-w-[85vw] bg-black/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/80 z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-2.5 border-b border-border/80">
              <h3 className="text-base font-semibold text-foreground">Customize Theme</h3>
              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <Cancel01Icon size={18} className="text-muted" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-2.5 space-y-3">
              {/* Accent Color Section */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <PaintBoardIcon size={14} className="text-primary" />
                  <h4 className="text-xs font-semibold text-foreground">Accent Color</h4>
                </div>
                <div className="flex gap-1.5 justify-center py-1">
                  {accents.map((swatch, i) => (
                    <motion.button
                      key={swatch.color}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setAccent(swatch.color)}
                      className="relative group"
                      aria-label={`Set ${swatch.label} accent`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full transition-all ${
                          accent === swatch.color 
                            ? 'ring-2 ring-offset-2 ring-offset-background shadow-lg' 
                            : 'hover:shadow-md'
                        }`}
                        style={{ 
                          background: swatch.hex,
                          ...(accent === swatch.color && {
                            '--tw-ring-color': swatch.hex
                          } as React.CSSProperties)
                        }}
                      />
                      {accent === swatch.color && (
                        <motion.div
                          layoutId="accent-indicator"
                          className="absolute inset-0 rounded-full border-2 border-white"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-medium text-muted whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {swatch.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Theme Style Section */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <SparklesIcon size={14} className="text-primary" />
                  <h4 className="text-xs font-semibold text-foreground">Theme Style</h4>
                </div>
                <div className="space-y-1">
                  {styles.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.button
                        key={item.style}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStyle(item.style)}
                        className={`w-full flex items-center space-x-2 px-1.5 py-1.5 rounded-lg transition-all ${
                          style === item.style
                            ? 'bg-primary/10 text-primary'
                            : 'text-foreground hover:bg-white/5 dark:hover:bg-black/10'
                        }`}
                      >
                        <IconComponent size={16} />
                        <span className="text-xs font-medium flex-1 text-left">
                          {item.label}
                        </span>
                        {style === item.style && (
                          <motion.div
                            layoutId="style-check"
                            className="w-1.5 h-1.5 rounded-full bg-primary"
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Current Theme Preview */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="p-2 rounded-lg bg-white/5 dark:bg-black/20 border border-primary/20"
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <SparklesIcon size={12} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Active Theme</p>
                    <p className="text-xs text-muted capitalize">{mode} · {accent} · {style}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}