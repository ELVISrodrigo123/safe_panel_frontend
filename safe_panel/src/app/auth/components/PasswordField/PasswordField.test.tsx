import { render, screen, fireEvent } from '@testing-library/react';
import { PasswordField } from './PasswordField';

vi.mock('@mui/icons-material', () => ({
  Lock: () => <span data-testid="lock-icon">Lock</span>,
  Visibility: () => <span data-testid="visibility-icon">Visibility</span>,
  VisibilityOff: () => <span data-testid="visibility-off-icon">VisibilityOff</span>,
}));

const renderPasswordField = (props = {}) => {
  const defaultProps = {
    value: '',
    error: '',
    showPassword: false,
    onChange: vi.fn(),
    onToggleVisibility: vi.fn(),
    ...props,
  };

  return render(<PasswordField {...defaultProps} />);
};

describe('PasswordField', () => {
  it('renders the password input with correct label and placeholder', () => {
    renderPasswordField();

    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('*********')).toBeInTheDocument();
    expect(screen.getByTestId('lock-icon')).toBeInTheDocument();
  });

  it('displays the provided value', () => {
    renderPasswordField({ value: 'mySecret123' });

    const input = screen.getByDisplayValue('mySecret123');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
  });

  it('calls onChange with the new value when input changes', () => {
    const handleChange = vi.fn();
    renderPasswordField({ onChange: handleChange });

    const input = screen.getByPlaceholderText('*********');
    fireEvent.change(input, { target: { value: 'newPass!2025' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('newPass!2025');
  });

  it('shows error message and marks field as error when error prop is provided', () => {
    renderPasswordField({ error: 'La contraseña es obligatoria' });

    expect(screen.getByText('La contraseña es obligatoria')).toBeInTheDocument();
    const input = screen.getByPlaceholderText('*********');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('toggles password visibility when the icon button is clicked', () => {
    const handleToggle = vi.fn();
    renderPasswordField({ showPassword: false, onToggleVisibility: handleToggle });

    const toggleButton = screen.getByLabelText('Mostrar contraseña');
    fireEvent.click(toggleButton);

    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  it('shows Visibility icon and "Mostrar contraseña" label when password is hidden', () => {
    renderPasswordField({ showPassword: false });
    expect(screen.getByLabelText('Mostrar contraseña')).toBeInTheDocument();
    expect(screen.getByTestId('visibility-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('visibility-off-icon')).not.toBeInTheDocument();
  });

  it('shows VisibilityOff icon and "Ocultar contraseña" label when password is visible', () => {
    renderPasswordField({ showPassword: true });
    expect(screen.getByLabelText('Ocultar contraseña')).toBeInTheDocument();
    expect(screen.getByTestId('visibility-off-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('visibility-icon')).not.toBeInTheDocument();
  });

  it('changes input type based on showPassword prop', () => {
    const { rerender } = renderPasswordField({ showPassword: false });
    let input = screen.getByPlaceholderText('*********');
    expect(input).toHaveAttribute('type', 'password');

    rerender(
      <PasswordField
        value=""
        error=""
        showPassword={true}
        onChange={vi.fn()}
        onToggleVisibility={vi.fn()}
      />
    );
    input = screen.getByPlaceholderText('*********');
    expect(input).toHaveAttribute('type', 'text');
  });
});
