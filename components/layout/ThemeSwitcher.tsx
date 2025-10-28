'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun03Icon, 
  Moon02Icon, 
  Settings02Icon,
  SparklesIcon,
  CircleIcon,
  FavouriteIcon
} from 'hugeicons-react';
import { useState, useEffect } from 'react';
import { useTheme } from '../providers/ThemeProvider';
import type { AccentColor, ThemeStyle } from '@/lib/themes';

export function ThemeSwitcher() {
  const { mode, accent, style, toggleMode, setAccent, setStyle } = useTheme();
  const [showOptions, setShowOptions] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close panel when clicking outside
  useEffect(() => {
    if (!showOptions) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if click is outside the theme switcher
      if (!target.closest('[data-theme-switcher]')) {
        setShowOptions(false);
      }
    };

    // Add delay to prevent immediate closure from the settings button click
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showOptions]);

  const accents: { color: AccentColor; label: string; class: string }[] = [
    { color: 'purple', label: 'Purple', class: 'bg-purple-600' },
    { color: 'blue', label: 'Blue', class: 'bg-blue-600' },
    { color: 'green', label: 'Green', class: 'bg-green-600' },
  ];

  const styles: { style: ThemeStyle; label: string; icon: typeof SparklesIcon }[] = [
    { style: 'default', label: 'Default', icon: SparklesIcon },
    { style: 'monochromatic', label: 'Mono', icon: CircleIcon },
    { style: 'pixelated', label: 'Grainy', icon: FavouriteIcon },
  ];

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2">
        <div className="p-2">
          <div className="w-6 h-6" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative " data-theme-switcher>
      {/* Theme Toggle Buttons */}
      <div className="flex items-center space-x-2">
        {/* Mode Toggle */}
        <button
          onClick={toggleMode}
          className="p-2 text-foreground hover:text-primary transition-colors"
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
                <Moon02Icon size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun03Icon size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Settings Toggle */}
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="p-2 text-foreground hover:text-primary transition-colors"
          aria-label="Theme settings"
        >
          <Settings02Icon size={24} />
        </button>
      </div>

      {/* Options Panel */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute -left-54 mt-4 w-[360px] overflow-hidden"
          >
            <div
              className="p-4 border border-border text-foreground rounded-4xl shadow-4xl"
              style={{
                backgroundColor: 'rgba(var(--card) / 0.95)',
                backdropFilter: 'blur(40px)',
              }}
            >
              <div className="flex gap-4">
                {/* Accent Colors - Left Side */}
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted mb-3 uppercase tracking-wider">
                    Accent Color
                  </p>
                  <div className="space-y-2">
                    {accents.map((item, index) => (
                      <motion.button
                        key={item.color}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => {
                          setAccent(item.color);
                        }}
                        className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                          accent === item.color
                            ? 'bg-primary/10 text-primary'
                            : 'text-foreground hover:bg-secondary'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full ${item.class} shadow-md`} />
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                        {accent === item.color && (
                          <motion.div
                            layoutId="accent-check"
                            className="ml-auto w-2 h-2 rounded-full bg-primary"
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="w-px bg-border" />

                {/* Style Options - Right Side */}
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted mb-3 uppercase tracking-wider">
                    Theme Style
                  </p>
                  <div className="space-y-2">
                    {styles.map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <motion.button
                          key={item.style}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => {
                            setStyle(item.style);
                          }}
                          className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                            style === item.style
                              ? 'bg-primary/10 text-primary'
                              : 'text-foreground hover:bg-secondary'
                          }`}
                        >
                          <IconComponent size={16} className="text-primary" />
                          <span className="text-sm font-medium">
                            {item.label}
                          </span>
                          {style === item.style && (
                            <motion.div
                              layoutId="style-check"
                              className="ml-auto w-2 h-2 rounded-full bg-primary"
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}