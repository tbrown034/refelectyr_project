// Components/Layout/Hero/HeroCTA.jsx
import Link from "next/link";
import PrimaryButton from "@/components/ui/buttons/general/PrimaryButton";
import SecondaryButton from "@/components/ui/buttons/general/SecondaryButton";

export default function HeroCTA({ year = "2025" }) {
  return (
    <div className="flex gap-2">
      <Link href={`/movies?year=${year}`}>
        <PrimaryButton text="Movies" />
      </Link>
      <Link href={`/tv?year=${year}`}>
        <SecondaryButton text="TV Shows" />
      </Link>
    </div>
  );
}
