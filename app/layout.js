// app/layout.js
import { Suspense } from "react";
import "./globals.css";
import Header from "components/Layout/Header/Header";
import Footer from "components/Layout/Footer/Footer";
import { YearProvider } from "library/Contexts/YearContext";
import { ListProvider } from "library/Contexts/ListContext";
import UserListSidebar from "components/UI/UserListSidebar";

export const metadata = {
  title: "ReflectYr",
  description: "Your entertainment ranking tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex p-2 flex-col min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
        <YearProvider>
          <ListProvider>
            <Header />
            <main className="flex-grow p-4 flex">
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </main>
            <Footer />
            <UserListSidebar />
          </ListProvider>
        </YearProvider>
      </body>
    </html>
  );
}
