'use client';

import { Box, Typography, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { ImageSection } from '../components/ImageSection/ImageSection';

export default function LoginPage() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 3,
          gap: 3,
        }}
      >
        <Box sx={{ textAlign: 'center', maxWidth: 600 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Bienvenido Minera San Cristobal S.A.
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Accede a tu panel de control de seguridad industrial
          </Typography>
        </Box>

        <LoginForm />

        <Button href="/" variant="outlined" startIcon={<ArrowBack />} sx={{ mt: 2 }}>
          Volver al sitio
        </Button>
      </Box>

      <ImageSection />
    </Box>
  );
}
