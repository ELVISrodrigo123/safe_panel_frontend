export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginErrors {
  email: string;
  password: string;
}

export interface UseLoginReturn {
  showPassword: boolean;
  formData: LoginFormData;
  errors: LoginErrors;
  handleInputChange: (field: keyof LoginFormData, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  togglePasswordVisibility: () => void;
}

export interface EmailFieldProps {
  value: string;
  error: string;
  onChange: (value: string) => void;
}

export interface PasswordFieldProps {
  value: string;
  error: string;
  showPassword: boolean;
  onChange: (value: string) => void;
  onToggleVisibility: () => void;
}
