'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { applyTheme, defaultTheme, ThemeMode, AccentColor, ThemeStyle, getThemeKey } from '@/lib/themes';

interface ThemeContextType {
  currentTheme: string;
  mode: ThemeMode;
  accent: AccentColor;
  style: ThemeStyle;
  setTheme: (themeKey: string) => void;
  setMode: (mode: ThemeMode) => void;
  setAccent: (accent: AccentColor) => void;
  setStyle: (style: ThemeStyle) => void;
  toggleMode: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always initialize with default values to ensure server/client match
  const [themeState, setThemeState] = useState({
    currentTheme: defaultTheme,
    mode: 'dark' as ThemeMode,
    accent: 'purple' as AccentColor,
    style: 'default' as ThemeStyle,
  });

  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage after mount (client-side only)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || defaultTheme;
    const savedStyle = (localStorage.getItem('theme-style') || 'default') as ThemeStyle;
    const [savedMode, savedAccent] = savedTheme.split('-') as [ThemeMode, AccentColor];

    applyTheme(savedTheme, savedStyle);

    setThemeState({
      currentTheme: savedTheme,
      mode: savedMode,
      accent: savedAccent,
      style: savedStyle,
    });

    setMounted(true);
  }, []);

  const { currentTheme, mode, accent, style } = themeState;

  const setTheme = (themeKey: string) => {
    localStorage.setItem('theme', themeKey);
    applyTheme(themeKey, style);

    const [newMode, newAccent] = themeKey.split('-') as [ThemeMode, AccentColor];
    setThemeState({ currentTheme: themeKey, mode: newMode, accent: newAccent, style });
  };

  const setMode = (newMode: ThemeMode) => setTheme(getThemeKey(newMode, accent));

  const setAccent = (newAccent: AccentColor) => setTheme(getThemeKey(mode, newAccent));

  const setStyle = (newStyle: ThemeStyle) => {
    localStorage.setItem('theme-style', newStyle);
    applyTheme(currentTheme, newStyle);
    setThemeState({ ...themeState, style: newStyle });
  };

  const toggleMode = () => setMode(mode === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        mode,
        accent,
        style,
        setTheme,
        setMode,
        setAccent,
        setStyle,
        toggleMode,
        mounted,
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