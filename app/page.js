import Hero from "components/Layout/Hero/Hero";
import HomeYearReset from "components/Layout/Hero/HomeYearReset"; // Adjust path as needed

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center p-2 flex-grow">
      {/* Client component that resets year without rendering anything */}
      <HomeYearReset />
      <Hero />
    </main>
  );
}
