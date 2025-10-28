'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
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
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage lazily
  const [themeState, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return {
      currentTheme: defaultTheme,
      mode: 'dark' as ThemeMode,
      accent: 'purple' as AccentColor,
      style: 'default' as ThemeStyle,
    };

    const savedTheme = localStorage.getItem('theme') || defaultTheme;
    const savedStyle = (localStorage.getItem('theme-style') || 'default') as ThemeStyle;
    const [savedMode, savedAccent] = savedTheme.split('-') as [ThemeMode, AccentColor];
    applyTheme(savedTheme, savedStyle);
    
    return {
      currentTheme: savedTheme,
      mode: savedMode,
      accent: savedAccent,
      style: savedStyle,
    };
  });

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