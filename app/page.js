// app/page.js
import Hero from "@/components/layout/hero/Hero";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  return <Hero searchParams={params} />;
}
