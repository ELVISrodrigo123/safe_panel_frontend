import { render, screen, fireEvent } from '@testing-library/react';
import { DesktopNav } from './DesktopNav';
import type { NavItem } from '../types/IProps';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const mockItems: NavItem[] = [
  { label: 'Home', type: 'scroll' },
  { label: 'About Us', type: 'link', href: '/about' },
  { label: 'ARTs', type: 'menu' },
];

describe('DesktopNav', () => {
  const mockScrollToTop = vi.fn();
  const mockServicesClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all navigation items with correct labels', () => {
    render(
      <DesktopNav
        items={mockItems}
        onScrollToTop={mockScrollToTop}
        onServicesClick={mockServicesClick}
        isServicesOpen={false}
      />
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('ARTs')).toBeInTheDocument();
  });

  it('should call onScrollToTop when scroll type item is clicked', () => {
    render(
      <DesktopNav
        items={mockItems}
        onScrollToTop={mockScrollToTop}
        onServicesClick={mockServicesClick}
        isServicesOpen={false}
      />
    );

    fireEvent.click(screen.getByText('Home'));
    expect(mockScrollToTop).toHaveBeenCalledOnce();
  });

  it('should call onServicesClick when menu type item is clicked', () => {
    render(
      <DesktopNav
        items={mockItems}
        onScrollToTop={mockScrollToTop}
        onServicesClick={mockServicesClick}
        isServicesOpen={false}
      />
    );

    fireEvent.click(screen.getByText('ARTs'));
    expect(mockServicesClick).toHaveBeenCalledOnce();
  });

  it('should render link items with correct href attributes', () => {
    render(
      <DesktopNav
        items={mockItems}
        onScrollToTop={mockScrollToTop}
        onServicesClick={mockServicesClick}
        isServicesOpen={false}
      />
    );

    const aboutLink = screen.getByText('About Us');
    expect(aboutLink.closest('a')).toHaveAttribute('href', '/about');
  });

  it('should have correct number of buttons and links', () => {
    render(
      <DesktopNav
        items={mockItems}
        onScrollToTop={mockScrollToTop}
        onServicesClick={mockServicesClick}
        isServicesOpen={false}
      />
    );

    const buttons = screen.getAllByRole('button');
    const links = screen.getAllByRole('link');

    expect(buttons).toHaveLength(2);
    expect(links).toHaveLength(1);
  });
});
