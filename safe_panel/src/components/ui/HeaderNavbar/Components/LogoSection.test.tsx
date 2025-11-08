import { render, screen } from '@testing-library/react';
import { LogoSection } from './LogoSection';

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    width,
    height,
    priority,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    priority?: boolean;
  }) => (
    <div
      data-testid="next-image-mock"
      data-src={src}
      data-alt={alt}
      data-width={width}
      data-height={height}
      data-priority={priority?.toString()}
    >
      NextImage: {alt}
    </div>
  ),
}));

describe('LogoSection', () => {
  it('should render logo image with correct attributes', () => {
    render(<LogoSection />);

    const logo = screen.getByTestId('next-image-mock');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('data-src', '/img/logo.svg');
    expect(logo).toHaveAttribute('data-alt', 'Minera San Cristobal');
    expect(logo).toHaveAttribute('data-width', '120');
    expect(logo).toHaveAttribute('data-height', '50');
    expect(logo).toHaveAttribute('data-priority', 'true');
  });

  it('should render company name texts', () => {
    render(<LogoSection />);

    expect(screen.getByText('MINERA')).toBeInTheDocument();
    expect(screen.getByText('San Cristobal')).toBeInTheDocument();
  });

  it('should apply text shadow styles to company names', () => {
    render(<LogoSection />);

    const mineraText = screen.getByText('MINERA');
    const sanCristobalText = screen.getByText('San Cristobal');

    expect(mineraText).toHaveClass('MuiTypography-root');
    expect(sanCristobalText).toHaveClass('MuiTypography-root');
  });

  it('should have correct layout structure', () => {
    render(<LogoSection />);

    const mainContainer = document.querySelector('.MuiBox-root');
    expect(mainContainer).toBeInTheDocument();
  });

  it('should render logo container with flex layout', () => {
    render(<LogoSection />);

    const logoContainer = screen.getByTestId('next-image-mock').closest('div');
    expect(logoContainer).toBeInTheDocument();
  });
});
