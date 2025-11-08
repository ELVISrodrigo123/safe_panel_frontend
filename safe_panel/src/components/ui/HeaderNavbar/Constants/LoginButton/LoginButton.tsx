import { Button, Stack, useTheme, useMediaQuery } from '@mui/material';

export const LoginButton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack direction={isMobile ? 'column' : 'row'} spacing={1} alignItems="center">
      <Button variant="outlined">Date</Button>
      <Button variant="contained" href="/auth/Login">
        Login
      </Button>
    </Stack>
  );
};

export default LoginButton;
