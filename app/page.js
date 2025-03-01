import DarkModeToggle from "./Components/Buttons/ThemeButton";

export default function Home() {
  return (
    <main>
      <h1 className="text-blue-800 dark:text-yellow-100">hello</h1>
      <DarkModeToggle />
    </main>
  );
}
