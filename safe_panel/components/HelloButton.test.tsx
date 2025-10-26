import { render, screen, fireEvent } from '@testing-library/react';
import HelloButton from './HelloButton';

describe('HelloButton', () => {
  it('renders the name correctly', () => {
    render(<HelloButton name="Elvis" />);
    expect(screen.getByText('Hello, Elvis!')).toBeInTheDocument();
  });

  it('calls onClick when button is clicked', () => {
    const handleClick = vi.fn();
    render(<HelloButton name="Elvis" onClick={handleClick} />);
    const button = screen.getByText('Hello, Elvis!');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
