'use client';

import { useState } from 'react';
import { Container, Typography, Grid, Box, Alert } from '@mui/material';
import DeploymentCard from '@/components/DeploymentCard';

export default function Home() {
  const [deploymentStatus, setDeploymentStatus] = useState<'success' | 'deploying' | 'error'>(
    'success'
  );

  const handleRedeploy = () => {
    setDeploymentStatus('deploying');
    // Simular despliegue
    setTimeout(() => {
      setDeploymentStatus('success');
    }, 3000);
  };

  return (
    <Container maxWidth="lg">
      <Box textAlign="center" my={4}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          🚀 SafePanel
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={4}>
          CI/CD Automático con GitHub Actions + Docker + VPS
        </Typography>
      </Box>

      <Alert severity="success" sx={{ mb: 4 }}>
        ¡Tu pipeline de CI/CD está funcionando correctamente! Cada push a main despliega
        automáticamente.
      </Alert>

      <Grid container justifyContent="center">
        <Grid>
          <DeploymentCard
            title="Producción"
            description="Aplicación desplegada automáticamente en tu VPS con Docker"
            status={deploymentStatus}
            lastDeployed="Hace unos segundos"
            version="1.0.0"
            onRedeploy={handleRedeploy}
          />
        </Grid>
      </Grid>

      <Box mt={6} textAlign="center">
        <Typography variant="h3" color="text.secondary">
          🌐 Tu app está funcionando en: http://188.166.63.175:3000
        </Typography>
        <Typography>
          elvis rodrigo 
        </Typography>
      </Box>
    </Container>
  );
}
