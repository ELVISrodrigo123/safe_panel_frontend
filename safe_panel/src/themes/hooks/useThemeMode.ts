import { useState, useCallback } from 'react';
import { ThemeMode } from '../types/IProps';
import { THEME_CONSTANTS } from '../constants/themeConstants';

export const useThemeMode = () => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') {
      return THEME_CONSTANTS.DEFAULT_THEME;
    }

    try {
      const savedMode = localStorage.getItem(THEME_CONSTANTS.STORAGE_KEY) as ThemeMode | null;
      if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
        return savedMode;
      }

      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    } catch (error) {
      console.warn('Error reading theme from localStorage:', error);
      return THEME_CONSTANTS.DEFAULT_THEME;
    }
  });

  const toggleTheme = useCallback(() => {
    setMode(prevMode => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';

      try {
        localStorage.setItem(THEME_CONSTANTS.STORAGE_KEY, newMode);
        document.documentElement.setAttribute('data-theme', newMode);
      } catch (error) {
        console.warn('Error saving theme to localStorage:', error);
      }

      return newMode;
    });
  }, []);

  return {
    mode,
    toggleTheme,
  };
};
