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

const DURATION = 0.3;

export function ThemeSwitcher() {
  const { mode, accent, style, toggleMode, setAccent, setStyle } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  return (
    <div className="relative flex items-center space-x-2" ref={containerRef}>
      {/* Mode Toggle Button */}
      <motion.button
        onClick={toggleMode}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
        aria-label="Toggle theme mode"
        suppressHydrationWarning
      >
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
      </motion.button>

      {/* Settings Icon Button */}
      <motion.button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ rotate: 90, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
        aria-label={isOpen ? 'Close settings' : 'Open settings'}
      >
        <Settings02Icon size={24} className="text-foreground" />
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/10 dark:bg-black/20 z-40"
            style={{ backdropFilter: "blur(8px)" }}
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
            transition={{ duration: DURATION, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed right-4 top-20 w-64 max-w-[85vw] bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 z-50"
            style={{ 
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)"
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-white/10 dark:border-gray-700/30">
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">Customize Theme</h3>
              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <Cancel01Icon size={18} className="text-gray-600 dark:text-gray-400" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-3 space-y-4">
              {/* Accent Color Section */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05, duration: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <PaintBoardIcon size={16} className="text-primary" />
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Accent Color</h4>
                </div>
                <div className="flex gap-2 justify-center py-2">
                  {accents.map((swatch, i) => (
                    <motion.button
                      key={swatch.color}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        delay: 0.1 + i * 0.05,
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                      }}
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setAccent(swatch.color)}
                      className="relative group"
                      aria-label={`Set ${swatch.label} accent`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full transition-all ${
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
                          className="absolute inset-0 rounded-full border-2 border-white dark:border-white/90"
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
                transition={{ delay: 0.15, duration: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <SparklesIcon size={16} className="text-primary" />
                  <h4 className="text-sm font-semibold text-foreground">Theme Style</h4>
                </div>
                <div className="space-y-1.5">
                  {styles.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.button
                        key={item.style}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ 
                          delay: 0.2 + index * 0.04,
                          type: "spring",
                          stiffness: 400,
                          damping: 30
                        }}
                        whileHover={{ scale: 1.02, x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStyle(item.style)}
                        className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-lg transition-all ${
                          style === item.style
                            ? 'bg-primary/90 text-primary shadow-sm'
                            : 'text-foreground hover:bg-secondary/50'
                        }`}
                      >
                        <IconComponent size={18} />
                        <span className="text-sm font-medium flex-1 text-left">
                          {item.label}
                        </span>
                        {style === item.style && (
                          <motion.div
                            layoutId="style-check"
                            className="w-2 h-2 rounded-full bg-primary shadow-sm"
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
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
                transition={{ delay: 0.3, duration: 0.2 }}
                className="p-3 rounded-lg bg-secondary/30 border border-border"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <SparklesIcon size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Active Theme</p>
                    <p className="text-xs text-muted-foreground capitalize">{mode} · {accent} · {style}</p>
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