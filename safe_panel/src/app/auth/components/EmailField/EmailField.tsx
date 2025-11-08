import { TextField } from '@mui/material';
import { Email } from '@mui/icons-material';
import { EmailFieldProps } from '../../types/IProps';

export const EmailField = ({ value, error, onChange }: EmailFieldProps) => (
  <TextField
    size="small"
    fullWidth
    label="Correo Electrónico"
    placeholder="tu-email@empresa.com"
    value={value}
    onChange={e => onChange(e.target.value)}
    error={!!error}
    helperText={error}
    InputProps={{
      startAdornment: <Email sx={{ color: 'action.active', mr: 1 }} />,
    }}
    sx={{
      '& .MuiInputBase-input': { fontSize: '1rem', py: 1 },
      '& .MuiInputLabel-root': { fontSize: '1rem' },
    }}
  />
);
