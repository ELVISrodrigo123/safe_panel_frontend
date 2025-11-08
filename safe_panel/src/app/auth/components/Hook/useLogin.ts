import { useState, useCallback } from 'react';
import { LoginFormData, LoginErrors, UseLoginReturn } from './../../types/IProps';

export const useLogin = (): UseLoginReturn => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<LoginErrors>({
    email: '',
    password: '',
  });

  const validateEmail = useCallback((email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'El correo electrónico es requerido';
    if (!emailRegex.test(email)) return 'Ingrese un correo válido';
    return '';
  }, []);

  const validatePassword = useCallback((password: string): string => {
    if (!password) return 'La contraseña es requerida';
    if (password.length < 6) return 'Mínimo 6 caracteres';
    return '';
  }, []);

  const handleInputChange = useCallback(
    (field: keyof LoginFormData, value: string): void => {
      setFormData(prev => ({ ...prev, [field]: value }));

      if (field === 'email') {
        setErrors(prev => ({ ...prev, email: validateEmail(value) }));
      } else if (field === 'password') {
        setErrors(prev => ({ ...prev, password: validatePassword(value) }));
      }
    },
    [validateEmail, validatePassword]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent): void => {
      e.preventDefault();
      const emailError = validateEmail(formData.email);
      const passwordError = validatePassword(formData.password);

      setErrors({ email: emailError, password: passwordError });

      if (!emailError && !passwordError) {
        console.log('Login exitoso', formData);
      }
    },
    [formData, validateEmail, validatePassword]
  );

  const togglePasswordVisibility = useCallback((): void => {
    setShowPassword(prev => !prev);
  }, []);

  return {
    showPassword,
    formData,
    errors,
    handleInputChange,
    handleSubmit,
    togglePasswordVisibility,
  };
};
