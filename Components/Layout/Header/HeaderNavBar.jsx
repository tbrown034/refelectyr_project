import Link from "next/link";

const navItems = [
  { text: "Home", href: "/" },
  { text: "Movies", href: "/movies" },
  { text: "TV Shows", href: "/tv" },
  { text: "About", href: "/about" },
];

const HeaderNavBar = () => {
  return (
    <nav className="flex gap-4">
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="text-gray-900 dark:text-white hover:underline transition-colors"
        >
          {item.text}
        </Link>
      ))}
    </nav>
  );
};

export default HeaderNavBar;
