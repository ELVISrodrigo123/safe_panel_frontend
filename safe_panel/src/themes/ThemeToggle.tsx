'use client';

import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const ThemeToggle = ({ size = 'medium', className }: ThemeToggleProps) => {
  const { mode, toggleTheme } = useTheme();

  return (
    <Tooltip title={mode === 'light' ? 'MODO OSCURO' : 'MODO CLARO'}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        size={size}
        className={className}
        sx={{
          backgroundColor: mode === 'light' ? 'secondary.main' : 'primary.main',
          '&:hover': {
            backgroundColor: mode === 'light' ? 'secondary.main' : 'secondary.main',
          },
        }}
      >
        {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
