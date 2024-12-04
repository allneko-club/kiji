
export default async function Footer() {

  return (
    <footer className="w-full mx-auto p-4 bg-gray-900 place-items-center">
      <ul className="flex flex-wrap text-gray-400">
        <li>
          <a href="#" className="hover:text-white transition-colors me-4 md:me-6">About</a>
        </li>
        <li>
          <a href="#" className="hover:text-white transition-colors me-4 md:me-6">Privacy Policy</a>
        </li>
        <li>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </li>
      </ul>
      <p className="text-sm mt-4 text-gray-400">© 2025 Footer. All Rights Reserved.</p>
    </footer>
  );
};
