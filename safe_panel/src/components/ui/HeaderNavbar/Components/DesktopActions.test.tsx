import { render, screen } from '@testing-library/react';
import { DesktopActions } from './DesktopActions';

vi.mock('@/src/themes', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">Theme Toggle</div>,
}));

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material');
  return {
    ...actual,
    Button: ({ children, variant, ...props }: { children: React.ReactNode; variant?: string }) => (
      <button data-variant={variant} {...props}>
        {children}
      </button>
    ),
    Box: ({ children, sx, ...props }: { children: React.ReactNode; sx?: object }) => (
      <div data-testid="mui-box" style={sx as React.CSSProperties} {...props}>
        {children}
      </div>
    ),
  };
});

describe('DesktopActions', () => {
  it('should render desktop actions with buttons and theme toggle', () => {
    render(<DesktopActions />);

    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('should render all action elements', () => {
    render(<DesktopActions />);

    const themeToggle = screen.getByTestId('theme-toggle');
    const dateButton = screen.getByText('Date');
    const loginButton = screen.getByText('Login');

    expect(themeToggle).toBeInTheDocument();
    expect(dateButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});
