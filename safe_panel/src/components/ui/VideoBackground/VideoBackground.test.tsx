import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { VideoBackground } from './VideoBackground';

describe('VideoBackground', () => {
  const mockOnClick = vi.fn();

  const mockProps = {
    videoSrc: '/video/header.mp4',
    title: 'PROPÓSITO',
    subtitle: 'Innovar en la minería en Bolivia y el mundo...',
    buttons: [
      {
        label: 'Ver Servicios',
        variant: 'contained' as const,
        onClick: mockOnClick,
      },
      {
        label: 'Contactar',
        variant: 'outlined' as const,
        onClick: mockOnClick,
      },
    ],
  };

  it('renders all main content correctly', () => {
    render(<VideoBackground {...mockProps} />);

    expect(screen.getByText('PROPÓSITO')).toBeInTheDocument();
    expect(screen.getByText(/Innovar en la minería/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ver Servicios' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Contactar' })).toBeInTheDocument();

    const videoElement = document.querySelector('video');
    expect(videoElement).toBeInTheDocument();
  });

  it('applies video source correctly', () => {
    render(<VideoBackground {...mockProps} />);

    const sourceElement = document.querySelector('source');
    expect(sourceElement).toHaveAttribute('src', '/video/header.mp4');
    expect(sourceElement).toHaveAttribute('type', 'video/mp4');
  });

  it('handles minimal props without content', () => {
    render(<VideoBackground videoSrc="/video/test.mp4" />);

    const videoElement = document.querySelector('video');
    expect(videoElement).toBeInTheDocument();

    expect(screen.queryByText('PROPÓSITO')).not.toBeInTheDocument();
    expect(screen.queryByText(/Innovar en la minería/)).not.toBeInTheDocument();
  });
});
