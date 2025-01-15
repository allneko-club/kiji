import { paths } from '@/config/paths';

export const mainMenu = [
  { href: paths.home.getHref(), label: 'home' },
  { href: paths.users.getHref(), label: 'users' },
  { href: paths.contact.getHref(), label: 'contact' },
];
