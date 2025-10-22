export type ThemeMode = 'dark' | 'light';
export type AccentColor = 'purple' | 'blue' | 'green';
export type ThemeStyle = 'default' | 'monochromatic' | 'pixelated';

export interface Theme {
  mode: ThemeMode;
  accent: AccentColor;
  style: ThemeStyle;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    primaryDark: string;
    primaryLight: string;
    secondary: string;
    accent: string;
    muted: string;
    border: string;
    card: string;
  };
}

const accentColors = {
  purple: {
    primary: '168 85 247',
    primaryDark: '126 34 206',
    primaryLight: '192 132 252',
    accent: '217 70 239',
  },
  blue: {
    primary: '59 130 246',
    primaryDark: '29 78 216',
    primaryLight: '96 165 250',
    accent: '6 182 212',
  },
  green: {
    primary: '16 185 129',
    primaryDark: '5 150 105',
    primaryLight: '52 211 153',
    accent: '20 184 166',
  },
};

export const themes: Record<string, Theme> = {
  'dark-purple': {
    mode: 'dark',
    accent: 'purple',
    style: 'default',
    colors: {
      background: '15 15 15',
      foreground: '255 255 255',
      primary: accentColors.purple.primary,
      primaryDark: accentColors.purple.primaryDark,
      primaryLight: accentColors.purple.primaryLight,
      secondary: '31 31 31',
      accent: accentColors.purple.accent,
      muted: '112 112 112',
      border: '42 42 42',
      card: '24 24 24',
    },
  },
  'dark-blue': {
    mode: 'dark',
    accent: 'blue',
    style: 'default',
    colors: {
      background: '10 14 26',
      foreground: '255 255 255',
      primary: accentColors.blue.primary,
      primaryDark: accentColors.blue.primaryDark,
      primaryLight: accentColors.blue.primaryLight,
      secondary: '26 31 46',
      accent: accentColors.blue.accent,
      muted: '107 114 128',
      border: '30 41 59',
      card: '21 27 42',
    },
  },
  'dark-green': {
    mode: 'dark',
    accent: 'green',
    style: 'default',
    colors: {
      background: '10 20 16',
      foreground: '255 255 255',
      primary: accentColors.green.primary,
      primaryDark: accentColors.green.primaryDark,
      primaryLight: accentColors.green.primaryLight,
      secondary: '26 36 32',
      accent: accentColors.green.accent,
      muted: '107 114 105',
      border: '30 43 36',
      card: '20 30 24',
    },
  },
  'light-purple': {
    mode: 'light',
    accent: 'purple',
    style: 'default',
    colors: {
      background: '255 255 255',
      foreground: '15 15 15',
      primary: accentColors.purple.primary,
      primaryDark: accentColors.purple.primaryDark,
      primaryLight: accentColors.purple.primaryLight,
      secondary: '245 245 245',
      accent: accentColors.purple.accent,
      muted: '107 114 128',
      border: '229 229 229',
      card: '250 250 250',
    },
  },
  'light-blue': {
    mode: 'light',
    accent: 'blue',
    style: 'default',
    colors: {
      background: '255 255 255',
      foreground: '10 14 26',
      primary: accentColors.blue.primary,
      primaryDark: accentColors.blue.primaryDark,
      primaryLight: accentColors.blue.primaryLight,
      secondary: '240 244 248',
      accent: accentColors.blue.accent,
      muted: '100 116 139',
      border: '226 232 240',
      card: '248 250 252',
    },
  },
  'light-green': {
    mode: 'light',
    accent: 'green',
    style: 'default',
    colors: {
      background: '255 255 255',
      foreground: '10 20 16',
      primary: accentColors.green.primary,
      primaryDark: accentColors.green.primaryDark,
      primaryLight: accentColors.green.primaryLight,
      secondary: '240 245 242',
      accent: accentColors.green.accent,
      muted: '107 114 105',
      border: '226 232 229',
      card: '248 250 249',
    },
  },
};

export const applyTheme = (themeKey: string): void => {
  const theme = themes[themeKey];
  if (!theme) return;

  const root = document.documentElement;
  
  // Apply CSS variables (RGB format)
  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    root.style.setProperty(`--${cssVar}`, value);
  });

  // Apply mode class
  if (theme.mode === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

export const getThemeKey = (mode: ThemeMode, accent: AccentColor): string => {
  return `${mode}-${accent}`;
};

export const defaultTheme = 'dark-purple';