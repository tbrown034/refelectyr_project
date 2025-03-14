import { Suspense } from "react";
import "./globals.css";
import Header from "@/Components/Layout/Header/Header";
import Footer from "@/Components/Layout/Footer/Footer";
import { YearProvider } from "@/Contexts/YearContext";
import UserListSidebar from "@/Components/UI/UserListSidebar"; // Add this import

export const metadata = {
  title: "ReflectYr",
  description: "Your entertainment ranking tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex p-2 flex-col min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
        <YearProvider>
          <Header />
          <main className="flex-grow p-4 flex">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </main>
          <Footer />
          <UserListSidebar /> {/* Add UserListSidebar */}
        </YearProvider>
      </body>
    </html>
  );
}
