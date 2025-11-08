import { Box } from '@mui/material';
import { ThemeToggle } from '@/src/themes';
import LoginButton from '../Constants/LoginButton/LoginButton';
export const DesktopActions = () => {
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
      <ThemeToggle />
      <LoginButton />
    </Box>
  );
};
