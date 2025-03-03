const Footer = () => {
  return (
    <footer className="w-full p-6 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-300 dark:border-gray-700">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Branding */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} ReflectYr. All rights reserved.
        </p>

        {/* Footer Links - All direct to About */}
        <nav className="flex gap-6 text-sm">
          <a
            href="/about"
            className="hover:underline hover:text-gray-900 dark:hover:text-white"
          >
            Privacy Policy
          </a>
          <a
            href="/about"
            className="hover:underline hover:text-gray-900 dark:hover:text-white"
          >
            Terms of Service
          </a>
          <a
            href="/about"
            className="hover:underline hover:text-gray-900 dark:hover:text-white"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
