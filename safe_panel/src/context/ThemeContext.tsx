'use client';

import React, { createContext, ReactNode, useState } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createPalette from '../themes/base/palette';
import { typography } from '../themes/base/typography';
import { breakpoints } from '../themes/base/breakpoints';
import { createComponents } from '../themes/components';
import { shadows } from '../themes/base/shadows';
import { shape } from '../themes/base/shape';
import createColors from '../themes/base/colors';
import { ThemeContextType } from '../themes/types/IProps';
import { useThemeMode } from '../themes/hooks/useThemeMode';
import { getThemeConfig } from '../themes/config/themeConfig';
import { THEME_CONSTANTS } from '../themes/constants/themeConstants';

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { mode, toggleTheme } = useThemeMode();
  const [mounted, setMounted] = useState(false);

  React.useLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ display: 'none' }} aria-hidden="true" />;
  }

  const colors = createColors(mode);
  const components = createComponents(colors);
  const palette = createPalette(mode);
  const customTheme = getThemeConfig(mode);

  const theme = createTheme({
    palette,
    typography,
    breakpoints,
    components,
    shadows,
    shape,
    spacing: THEME_CONSTANTS.SPACING,
    custom: customTheme,
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
