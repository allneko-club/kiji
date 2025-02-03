import { paths } from '@/config/paths';
import Link from 'next/link';

export default async function Footer() {

  return (
    <footer className="w-full mx-auto p-4 bg-gray-900 place-items-center">
      <ul className="flex flex-wrap text-gray-400">
        <li>
          <Link href={paths.about.getHref()} className="hover:text-white transition-colors me-4 md:me-6">
            About
          </Link>
        </li>
        <li>
          <Link href={paths.privacyPolicy.getHref()} className="hover:text-white transition-colors me-4 md:me-6">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href={paths.contact.getHref()} className="hover:text-white transition-colors">
            Contact
          </Link>
        </li>
      </ul>
      <p className="text-sm mt-4 text-gray-400">© 2025 Footer. All Rights Reserved.</p>
    </footer>
  );
};
