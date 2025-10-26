import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';
import { CheckCircle, Cloud, Code, Rocket } from '@mui/icons-material';

interface DeploymentCardProps {
  title: string;
  description: string;
  status: 'success' | 'deploying' | 'error';
  lastDeployed: string;
  version: string;
  onRedeploy?: () => void;
}

const DeploymentCard: React.FC<DeploymentCardProps> = ({
  title,
  description,
  status,
  lastDeployed,
  version,
  onRedeploy,
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle color="success" />;
      case 'deploying':
        return <Cloud color="info" />;
      case 'error':
        return <Code color="error" />;
      default:
        return <Rocket color="action" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'success';
      case 'deploying':
        return 'info';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'success':
        return 'Desplegado';
      case 'deploying':
        return 'Desplegando';
      case 'error':
        return 'Error';
      default:
        return 'Desconocido';
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: 2,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        borderRadius: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h5" component="h2" fontWeight="bold">
            {title}
          </Typography>
          {getStatusIcon()}
        </Box>

        {/* Description */}
        <Typography variant="body2" color="text.secondary" mb={3}>
          {description}
        </Typography>

        {/* Status and Version */}
        <Box display="flex" gap={1} mb={2} flexWrap="wrap">
          <Chip label={getStatusText()} color={getStatusColor()} size="small" variant="outlined" />
          <Chip label={`v${version}`} color="primary" size="small" />
        </Box>

        {/* Deployment Info */}
        <Box mb={3}>
          <Typography variant="caption" color="text.secondary" display="block">
            Último despliegue:
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            {lastDeployed}
          </Typography>
        </Box>

        {/* Action Button */}
        <Button
          variant="contained"
          fullWidth
          startIcon={<Rocket />}
          onClick={onRedeploy}
          disabled={status === 'deploying'}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          {status === 'deploying' ? 'Desplegando...' : 'Redesplegar'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DeploymentCard;
