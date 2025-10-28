'use client';

import { useEffect } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';

// Color mappings for each theme (matching your header background)
const themeColors = {
  'dark-purple': '#0f0f0f',    // matches --background for dark-purple
  'dark-blue': '#0a0e1a',      // matches --background for dark-blue
  'dark-green': '#0a1410',     // matches --background for dark-green
  'light-purple': '#ffffff',   // matches --background for light themes
  'light-blue': '#ffffff',
  'light-green': '#ffffff',
};

export function BrowserThemeColor() {
  const { currentTheme } = useTheme();

  useEffect(() => {
    // Get the color for current theme
    const color = themeColors[currentTheme as keyof typeof themeColors] || '#0f0f0f';

    // Update theme-color meta tag
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute('content', color);

    // Update Apple mobile web app status bar
    let metaAppleStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (!metaAppleStatusBar) {
      metaAppleStatusBar = document.createElement('meta');
      metaAppleStatusBar.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
      document.head.appendChild(metaAppleStatusBar);
    }
    // Use 'black-translucent' for a immersive experience
    metaAppleStatusBar.setAttribute('content', 'black-translucent');

    // Update msapplication-navbutton-color for Windows Phone
    let metaMsNavButton = document.querySelector('meta[name="msapplication-navbutton-color"]');
    if (!metaMsNavButton) {
      metaMsNavButton = document.createElement('meta');
      metaMsNavButton.setAttribute('name', 'msapplication-navbutton-color');
      document.head.appendChild(metaMsNavButton);
    }
    metaMsNavButton.setAttribute('content', color);
  }, [currentTheme]);

  return null;
}