import "./globals.css";

export const metadata = {
  title: "ReflectYr",
  description: "Your entertainment ranking tool",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
