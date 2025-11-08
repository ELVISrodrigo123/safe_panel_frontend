import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

export const ImageSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) return null;

  return (
    <Box
      sx={{
        width: '50%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src="/img/Login-image.svg"
        alt="Seguridad industrial minera"
        loading="lazy"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          margin: 0,
          padding: 0,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: theme.zIndex.tooltip,
          textAlign: 'center',
          p: 0,
          margin: 0,
          width: '80%',
        }}
      >
        <Typography variant="h3" component="div" fontWeight="bold">
          Tu seguridad, nuestra prioridad en cada operación
        </Typography>
      </Box>
    </Box>
  );
};
