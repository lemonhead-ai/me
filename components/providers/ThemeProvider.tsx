'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { applyTheme, defaultTheme, ThemeMode, AccentColor, getThemeKey } from '@/lib/themes';

interface ThemeContextType {
  currentTheme: string;
  mode: ThemeMode;
  accent: AccentColor;
  setTheme: (themeKey: string) => void;
  setMode: (mode: ThemeMode) => void;
  setAccent: (accent: AccentColor) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage lazily
  const [themeState, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return {
      currentTheme: defaultTheme,
      mode: 'dark' as ThemeMode,
      accent: 'purple' as AccentColor,
    };

    const savedTheme = localStorage.getItem('theme') || defaultTheme;
    const [savedMode, savedAccent] = savedTheme.split('-') as [ThemeMode, AccentColor];
    applyTheme(savedTheme);
    return {
      currentTheme: savedTheme,
      mode: savedMode,
      accent: savedAccent,
    };
  });

  const { currentTheme, mode, accent } = themeState;

  const setTheme = (themeKey: string) => {
    localStorage.setItem('theme', themeKey);
    applyTheme(themeKey);

    const [newMode, newAccent] = themeKey.split('-') as [ThemeMode, AccentColor];
    setThemeState({ currentTheme: themeKey, mode: newMode, accent: newAccent });
  };

  const setMode = (newMode: ThemeMode) => setTheme(getThemeKey(newMode, accent));
  const setAccent = (newAccent: AccentColor) => setTheme(getThemeKey(mode, newAccent));
  const toggleMode = () => setMode(mode === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        mode,
        accent,
        setTheme,
        setMode,
        setAccent,
        toggleMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
