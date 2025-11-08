import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MobileNav } from './MobileNav';

vi.mock('next/link', () => {
  const MockLink = ({
    href,
    children,
    onClick,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    [key: string]: unknown;
  }) => {
    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = e => {
      e.preventDefault();
      onClick?.(e);
    };

    return (
      <a href={href} onClick={handleClick} {...props} data-testid={`link-${href}`}>
        {children}
      </a>
    );
  };

  MockLink.displayName = 'MockedNextLink';

  return {
    __esModule: true,
    default: MockLink,
  };
});

vi.mock('@/src/themes', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">Theme Toggle</div>,
}));

const mockOnClose = vi.fn();
const mockOnScrollToTop = vi.fn();
const mockOnServicesClick = vi.fn();

const mockItems = [
  { label: 'Home', type: 'scroll' as const },
  { label: 'About Us', type: 'link' as const, href: '/about' },
  { label: 'ARTs', type: 'menu' as const },
];

const mockServicesItems = [
  { label: '210-Chancado', href: '/services/chancado' },
  { label: '220-Domo', href: '/services/domo' },
];

const renderMobileNav = (props = {}) => {
  const defaultProps = {
    items: mockItems,
    isOpen: true,
    anchorEl: document.createElement('div'),
    onClose: mockOnClose,
    onScrollToTop: mockOnScrollToTop,
    onServicesClick: mockOnServicesClick,
    servicesItems: mockServicesItems,
    ...props,
  };

  return render(<MobileNav {...defaultProps} />);
};

describe('MobileNav', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all navigation items when menu is open', () => {
    renderMobileNav();

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('ARTs')).toBeInTheDocument();
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('calls onScrollToTop and onClose when scroll item is clicked', () => {
    renderMobileNav();
    fireEvent.click(screen.getByText('Home'));
    expect(mockOnScrollToTop).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('renders link items with correct href', () => {
    renderMobileNav();
    expect(screen.getByTestId('link-/about')).toHaveAttribute('href', '/about');
  });

  it('toggles services submenu and shows service items', () => {
    renderMobileNav();
    fireEvent.click(screen.getByText('ARTs'));

    expect(screen.getByText('210-Chancado')).toBeInTheDocument();
    expect(screen.getByText('220-Domo')).toBeInTheDocument();

    expect(screen.getByTestId('link-/services/chancado')).toHaveAttribute(
      'href',
      '/services/chancado'
    );
    expect(screen.getByTestId('link-/services/domo')).toHaveAttribute('href', '/services/domo');
  });

  it('closes menu when service item is clicked', () => {
    renderMobileNav();
    fireEvent.click(screen.getByText('ARTs'));
    fireEvent.click(screen.getByText('210-Chancado'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not render menu content when isOpen is false', () => {
    renderMobileNav({ isOpen: false, anchorEl: null });
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.queryByText('About Us')).not.toBeInTheDocument();
    expect(screen.queryByTestId('theme-toggle')).not.toBeInTheDocument();
  });

  it('calls onServicesClick when menu button is clicked', () => {
    renderMobileNav();
    const menuButton = screen.getByLabelText('open menu');
    fireEvent.click(menuButton);
    expect(mockOnServicesClick).toHaveBeenCalledTimes(1);
  });
});
