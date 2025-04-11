// app/page.js
import Hero from "@/components/layout/hero/Hero";

export default async function Home({ searchParams }) {
  // This needs to be awaited
  const params = await searchParams;

  return (
    <div className="w-full">
      <Hero searchParams={params} />
    </div>
  );
}
