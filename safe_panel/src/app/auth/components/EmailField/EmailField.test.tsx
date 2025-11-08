import { render, screen, fireEvent } from '@testing-library/react';
import { EmailField } from './EmailField';

vi.mock('@mui/icons-material', () => ({
  Email: () => <span data-testid="email-icon">Email Icon</span>,
}));

const renderEmailField = (props = {}) => {
  const defaultProps = {
    value: '',
    error: '',
    onChange: vi.fn(),
    ...props,
  };

  return render(<EmailField {...defaultProps} />);
};

describe('EmailField', () => {
  it('renders the email input with correct label and placeholder', () => {
    renderEmailField();

    const input = screen.getByPlaceholderText('tu-email@empresa.com');
    expect(input).toBeInTheDocument();
    expect(screen.getByLabelText('Correo Electrónico')).toBeInTheDocument();
    expect(screen.getByTestId('email-icon')).toBeInTheDocument();
  });

  it('displays the provided value', () => {
    renderEmailField({ value: 'test@empresa.com' });

    const input = screen.getByDisplayValue('test@empresa.com');
    expect(input).toBeInTheDocument();
  });

  it('calls onChange with the new value when input changes', () => {
    const handleChange = vi.fn();
    renderEmailField({ onChange: handleChange });

    const input = screen.getByPlaceholderText('tu-email@empresa.com');
    fireEvent.change(input, { target: { value: 'nuevo@ejemplo.com' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('nuevo@ejemplo.com');
  });

  it('shows error message and marks field as error when error prop is provided', () => {
    renderEmailField({ error: 'Correo inválido' });

    expect(screen.getByText('Correo inválido')).toBeInTheDocument();
    const input = screen.getByPlaceholderText('tu-email@empresa.com');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not show error message when error is empty', () => {
    renderEmailField({ error: '' });

    expect(screen.queryByText('Correo inválido')).not.toBeInTheDocument();
  });
});
