const navItems = [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Contact", href: "/contact" },
];

const HeaderNavBar = () => {
  return (
    <nav className="flex gap-4">
      {navItems.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className="text-gray-900 hover:underline"
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
};

export default HeaderNavBar;
