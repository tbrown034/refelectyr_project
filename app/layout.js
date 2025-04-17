// app/layout.js
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { YearProvider } from "@/library/contexts/YearContext";
import { ListProvider } from "@/library/contexts/ListContext";
import TempListsSidebar from "@/components/layout/lists/TempListsSidebar";

export const metadata = {
  title: "ReflectYr",
  description: "Your entertainment ranking tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-slate-300  dark:bg-slate-800 dark:text-white transition-colors duration-300">
        <YearProvider>
          <ListProvider>
            <Header />
            <main className="flex-grow">
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </main>
            <Footer />
            <TempListsSidebar />
          </ListProvider>
        </YearProvider>
      </body>
    </html>
  );
}
