export const THEME_CONSTANTS = {
  STORAGE_KEY: 'themeMode',
  DEFAULT_THEME: 'light' as const,
  SPACING: 9,

  BREAKPOINTS: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1840,
  },

  SIDEBAR: {
    WIDTH: '290px',
    HEADER_HEIGHT: '80px',
  },

  BORDER_RADIUS: {
    SM: '6px',
    DEFAULT: '10px',
    LG: '12px',
    XL: '16px',
  },

  TRANSITIONS: {
    SHORT: '150ms',
    STANDARD: '300ms',
    LONG: '500ms',
  },

  Z_INDEX: {
    APP_BAR: 1100,
    DRAWER: 1200,
    MODAL: 1300,
    SNACKBAR: 1400,
    TOOLTIP: 1500,
  },
} as const;

export type ThemeConstants = typeof THEME_CONSTANTS;
