'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sun03Icon, Moon02Icon, Settings02Icon } from 'hugeicons-react';
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

  const accents: { color: AccentColor; label: string; class: string }[] = [
    { color: 'purple', label: 'Purple', class: 'bg-purple-600' },
    { color: 'blue', label: 'Blue', class: 'bg-blue-600' },
    { color: 'green', label: 'Green', class: 'bg-green-600' },
  ];

  const styles: { style: ThemeStyle; label: string; icon: string }[] = [
    { style: 'default', label: 'Default', icon: '~' },
    { style: 'monochromatic', label: 'Mono', icon: '~' },
    { style: 'pixelated', label: 'Grainy', icon: '~' },
  ];

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2">
        <div className="p-2 rounded-lg bg-secondary">
          <div className="w-5 h-5" />
        </div>
        <div className="p-2 rounded-lg bg-secondary">
          <div className="w-5 h-5" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Theme Toggle Buttons */}
      <div className="flex items-center space-x-2">
        {/* Mode Toggle */}
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={toggleMode}
          className="p-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors"
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
                <Moon02Icon size={20} className="text-primary" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun03Icon size={20} className="text-primary" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Settings Toggle */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowOptions(!showOptions)}
          className="p-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors"
          aria-label="Theme settings"
        >
          <Settings02Icon size={20} className="text-primary" />
        </motion.button>
      </div>

      {/* Options Panel */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 1.1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute -right-10 mt-2 p-3 backdrop-blur-4xl border border-border rounded-4xl shadow-lg min-w-[180px] bg-card/90"
          >
            {/* Accent Colors */}
            <p className="text-xs font-semibold text-muted mb-2 uppercase tracking-wider">
              Accent Color
            </p>
            <div className="space-y-2 mb-4">
              {accents.map((item) => (
                <motion.button
                  key={item.color}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setAccent(item.color);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-3xl transition-colors ${
                    accent === item.color
                      ? 'bg-primary/10 border border-primary'
                      : 'hover:bg-secondary border border-transparent'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full ${item.class}`} />
                  <span className="text-sm font-medium text-foreground">
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

            {/* Style Options */}
            <div className="border-t border-border pt-3">
              <p className="text-xs font-semibold text-muted mb-2 uppercase tracking-wider">
                Theme Style
              </p>
              <div className="space-y-2">
                {styles.map((item) => (
                  <motion.button
                    key={item.style}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setStyle(item.style);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-3xl transition-colors ${
                      style === item.style
                        ? 'bg-primary/10 border border-primary'
                        : 'hover:bg-secondary border border-transparent'
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className="text-sm font-medium text-foreground">
                      {item.label}
                    </span>
                    {style === item.style && (
                      <motion.div
                        layoutId="style-check"
                        className="ml-auto w-2 h-2 rounded-full bg-primary"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}