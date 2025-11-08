import React from 'react';
import { render, screen } from '@testing-library/react';
import { ImageSection } from './ImageSection';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material');
  return {
    ...actual,
    useMediaQuery: vi.fn(),
  };
});

const renderWithTheme = (ui: React.ReactElement) => {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('ImageSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not render on mobile (when useMediaQuery returns true)', () => {
    vi.mocked(useMediaQuery).mockReturnValue(true);

    renderWithTheme(<ImageSection />);

    expect(screen.queryByAltText('Seguridad industrial minera')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Tu seguridad, nuestra prioridad en cada operación')
    ).not.toBeInTheDocument();
  });

  it('renders image and text on desktop (when useMediaQuery returns false)', () => {
    vi.mocked(useMediaQuery).mockReturnValue(false);

    renderWithTheme(<ImageSection />);

    const image = screen.getByAltText('Seguridad industrial minera');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/img/Login-image.svg');
    expect(image).toHaveAttribute('loading', 'lazy');

    expect(
      screen.getByText('Tu seguridad, nuestra prioridad en cada operación')
    ).toBeInTheDocument();
  });
});
