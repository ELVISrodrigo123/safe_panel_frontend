import { render, screen } from '@testing-library/react';
import NavbarHeader from './NavbarHeader';

vi.mock('./LogoSection', () => ({
  LogoSection: () => <div data-testid="logo-section">Logo</div>,
}));

vi.mock('./DesktopNav', () => ({
  DesktopNav: () => <div data-testid="desktop-nav">Desktop Nav</div>,
}));

vi.mock('./DesktopActions', () => ({
  DesktopActions: () => <div data-testid="desktop-actions">Desktop Actions</div>,
}));

vi.mock('./MobileNav', () => ({
  MobileNav: () => <div data-testid="mobile-nav">Mobile Nav</div>,
}));

vi.mock('@/src/hook/Navbar/useNavbarState', () => ({
  useNavbarState: () => ({
    servicesAnchor: null,
    mobileMenuAnchor: null,
    isServicesOpen: false,
    isMobileOpen: false,
    handleServicesClick: vi.fn(),
    handleServicesClose: vi.fn(),
    handleMobileMenuOpen: vi.fn(),
    handleMobileMenuClose: vi.fn(),
  }),
}));

vi.mock('@/src/hook/Navbar/useScrollTo', () => ({
  useScrollTo: () => vi.fn(),
}));

vi.mock('../Constants/Navbar', () => ({
  Nav_Items: [],
  Services_Items: [],
}));

describe('NavbarHeader', () => {
  it('should render without crashing', () => {
    render(<NavbarHeader topRef={{ current: null }} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should render all main components', () => {
    render(<NavbarHeader topRef={{ current: null }} />);

    expect(screen.getByTestId('logo-section')).toBeInTheDocument();
    expect(screen.getByTestId('desktop-nav')).toBeInTheDocument();
    expect(screen.getByTestId('desktop-actions')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-nav')).toBeInTheDocument();
  });

  it('should render within a Container', () => {
    render(<NavbarHeader topRef={{ current: null }} />);

    const container = screen.getByTestId('logo-section').closest('div[class*="MuiContainer"]');
    expect(container).toBeInTheDocument();
  });

  it('should render Toolbar with correct props', () => {
    render(<NavbarHeader topRef={{ current: null }} />);

    const toolbar = screen.getByRole('banner').querySelector('.MuiToolbar-root');
    expect(toolbar).toBeInTheDocument();
  });

  it('should have AppBar with correct structure', () => {
    render(<NavbarHeader topRef={{ current: null }} />);

    const appBar = screen.getByRole('banner');
    expect(appBar).toBeInTheDocument();
    expect(appBar).toHaveClass('MuiAppBar-root');
  });
});
