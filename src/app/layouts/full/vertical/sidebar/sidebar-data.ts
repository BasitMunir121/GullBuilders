import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Menus',
  },
  {
    displayName: 'Dashboard',
    iconName: 'home',
    bgcolor: 'primary',
    route: '/dashboard',
  },
  {
    navCap: 'User Menus',
  },
  {
    displayName: 'Educational Content',
    iconName: 'share',
    bgcolor: 'primary',
    route: 'KisanXpert/content',
  },
  {
    displayName: 'Notifications',
    iconName: 'bell',
    bgcolor: 'primary',
    route: 'KisanXpert/notifications',
  },
  {
    displayName: 'Live Auction',
    iconName: 'notification',
    bgcolor: 'primary',
    route: 'KisanXpert/auction',
  },
  {
    displayName: 'Products',
    iconName: 'star',
    bgcolor: 'primary',
    route: 'KisanXpert/products',
  },
  // {
  //   displayName: 'External Link',
  //   bgcolor: 'error',
  //   iconName: 'star',
  //   route: 'https://www.google.com/',
  //   external: true,
  // },
];
