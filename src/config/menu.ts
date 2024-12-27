import { paths } from '@/config/paths';

export const mainMenu = [
  { href: paths.home.getHref(), label: 'home' },
  { href: paths.posts.getHref(), label: 'posts' },
  { href: paths.contact.getHref(), label: 'contact' },
];

export const adminMenu = [
  { href: paths.admin.users.getHref(), label: 'users' },
];

export const myPageMenu = [
  { href: paths.my.posts.getHref(), label: 'posts' },
  { href: paths.my.settings.root.getHref(), label: 'settings' },
];