import { TextField, IconButton } from '@mui/material';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { PasswordFieldProps } from '../../types/IProps';

export const PasswordField = ({
  value,
  error,
  showPassword,
  onChange,
  onToggleVisibility,
}: PasswordFieldProps) => (
  <TextField
    size="small"
    fullWidth
    label="Contraseña"
    type={showPassword ? 'text' : 'password'}
    placeholder="*********"
    value={value}
    onChange={e => onChange(e.target.value)}
    error={!!error}
    helperText={error}
    InputProps={{
      startAdornment: <Lock sx={{ color: 'action.active', mr: 1 }} />,
      endAdornment: (
        <IconButton
          size="small"
          onClick={onToggleVisibility}
          edge="end"
          aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      ),
    }}
    sx={{
      '& .MuiInputBase-input': { fontSize: '1rem', py: 1 },
      '& .MuiInputLabel-root': { fontSize: '1rem' },
    }}
  />
);
