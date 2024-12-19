import { paths } from '@/config/paths';

export const mainMenu = [
  { href: paths.home.getHref(), label: 'home' },
  { href: paths.contact.getHref(), label: 'contact' },
];

export const adminMenu = [
  { href: paths.admin.users.getHref(), label: 'users' },
];