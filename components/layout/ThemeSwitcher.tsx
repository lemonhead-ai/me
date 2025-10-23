'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sun03Icon, Moon02Icon, Settings02Icon } from 'hugeicons-react';
import { useState, useEffect } from 'react';
import { useTheme } from '../providers/ThemeProvider';
import type { AccentColor } from '@/lib/themes';

export function ThemeSwitcher() {
  const { mode, accent, toggleMode, setAccent } = useTheme();
  const [showOptions, setShowOptions] = useState(false);
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setMounted(true);
  }, []);

  const accents: { color: AccentColor; label: string; class: string }[] = [
    { color: 'purple', label: 'Purple', class: 'bg-purple-500' },
    { color: 'blue', label: 'Blue', class: 'bg-blue-500' },
    { color: 'green', label: 'Green', class: 'bg-green-500' },
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
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
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

      {/* Accent Color Picker */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 p-3  backdrop-blur-4xl border border-border rounded-4xl shadow-lg min-w-[180px]"
          >
            <p className="text-xs font-semibold text-muted mb-2 uppercase tracking-wider">
              Accent Color
            </p>
            <div className="space-y-2">
              {accents.map((item) => (
                <motion.button
                  key={item.color}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setAccent(item.color);
                    setShowOptions(false);
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}