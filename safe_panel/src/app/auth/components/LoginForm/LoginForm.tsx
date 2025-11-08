import { Box, Typography, Button, useTheme } from '@mui/material';
import { THEME_CONSTANTS } from '@/src/themes';
import { useLogin } from '../Hook/useLogin';
import { EmailField } from '../EmailField/EmailField';
import { PasswordField } from '../PasswordField/PasswordField';

export const LoginForm = () => {
  const theme = useTheme();
  const {
    showPassword,
    formData,
    errors,
    handleInputChange,
    handleSubmit,
    togglePasswordVisibility,
  } = useLogin();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        backgroundColor: theme.palette.primary.light,
        py: 4,
        px: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        borderRadius: THEME_CONSTANTS.BORDER_RADIUS.DEFAULT,
        width: '100%',
        maxWidth: 400,
      }}
    >
      <Typography variant="h5" component="h2">
        Ingresa tus credenciales
      </Typography>

      <EmailField
        value={formData.email}
        error={errors.email}
        onChange={value => handleInputChange('email', value)}
      />

      <PasswordField
        value={formData.password}
        error={errors.password}
        showPassword={showPassword}
        onChange={value => handleInputChange('password', value)}
        onToggleVisibility={togglePasswordVisibility}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={!formData.email || !formData.password}
      >
        Iniciar Sesión
      </Button>
    </Box>
  );
};
