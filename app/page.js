import Hero from "@/components/layout/hero/Hero";
import HomeYearReset from "@/components/layout/hero/HomeYearReset";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center p-2 flex-grow">
      <HomeYearReset />
      <Hero />
    </main>
  );
}
