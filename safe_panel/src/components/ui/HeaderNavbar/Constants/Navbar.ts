import { NavItem, ServiceItem } from '../types/IProps';

export const Nav_Items: NavItem[] = [
  { label: 'Home', type: 'scroll' },
  { label: 'About Us', type: 'link', href: '/AdministrationPanel/About' },
  { label: 'ARTs', type: 'menu' },
  { label: 'Projects', type: 'link', href: '/projects' },
  { label: 'Contact', type: 'link', href: '/AdministrationPanel/Contact' },
];

export const Services_Items: ServiceItem[] = [
  { label: '210-Chancado', href: '/services/chancado' },
  { label: '220-Domo', href: '/services/domo' },
  { label: '230-Molienda', href: '/services/molienda' },
  { label: '240-Flotacion Plomo', href: '/services/flotacion-plomo' },
  { label: '250-Flotacion Zinc', href: '/services/flotacion-zinc' },
  { label: '270-Reactivos', href: '/services/reactivos' },
  { label: '310-Espezadores', href: '/services/espezadores' },
  { label: '320-Filtros', href: '/services/filtros' },
  { label: '330-Carguio', href: '/services/carguio' },
];
