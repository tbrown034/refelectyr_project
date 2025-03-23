// app/page.js
import Hero from "@/components/layout/hero/Hero";

export default function Home({ searchParams }) {
  return (
    <div className="w-full">
      <Hero searchParams={searchParams} />
    </div>
  );
}
