'use client';

import { AppBar, Toolbar, Container, Menu, MenuItem } from '@mui/material';
import { useNavbarState } from '@/src/hook/Navbar/useNavbarState';
import { useScrollTo } from '@/src/hook/Navbar/useScrollTo';
import { LogoSection } from './LogoSection';
import { DesktopNav } from './DesktopNav';
import { DesktopActions } from './DesktopActions';
import { MobileNav } from './MobileNav';
import { Nav_Items, Services_Items } from '../Constants/Navbar';
import { NavbarHeaderProps } from '../types/IProps';
import Link from 'next/link';

export default function NavbarHeader({ topRef }: NavbarHeaderProps) {
  const {
    servicesAnchor,
    mobileMenuAnchor,
    isServicesOpen,
    isMobileOpen,
    handleServicesClick,
    handleServicesClose,
    handleMobileMenuOpen,
    handleMobileMenuClose,
  } = useNavbarState();

  const scrollToTop = useScrollTo(topRef);

  return (
    <AppBar
      sx={{ backgroundColor: theme => theme.palette.secondary.contrastText }}
      position="sticky"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LogoSection />
          <DesktopNav
            items={Nav_Items}
            onScrollToTop={scrollToTop}
            onServicesClick={handleServicesClick}
            isServicesOpen={isServicesOpen}
          />
          <DesktopActions />
          <MobileNav
            items={Nav_Items}
            isOpen={isMobileOpen}
            anchorEl={mobileMenuAnchor}
            onClose={handleMobileMenuClose}
            onScrollToTop={scrollToTop}
            onServicesClick={handleMobileMenuOpen}
            servicesItems={Services_Items}
          />
        </Toolbar>
      </Container>
      <Menu open={isServicesOpen} onClose={handleServicesClose} anchorEl={servicesAnchor}>
        {Services_Items.map(item => (
          <MenuItem
            sx={{
              fontSize: 16,
              '& a': {
                textDecoration: 'none',
                color: 'inherit',
                width: '100%',
                display: 'block',
              },
            }}
            key={item.label}
            onClick={handleServicesClose}
          >
            <Link href={item.href} passHref>
              {item.label}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
}
