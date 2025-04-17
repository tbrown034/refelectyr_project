import Link from "next/link";
import PrimaryButton from "@/components/ui/buttons/general/PrimaryButton";
import SecondaryButton from "@/components/ui/buttons/general/SecondaryButton";

export default function HeroCTA({ year = "2025" }) {
  return (
    <div className="flex justify-center gap-4">
      <Link href={`/movies?year=${year}`} className="w-full max-w-xs">
        <PrimaryButton text="Explore Movies" style="w-full text-lg py-3" />
      </Link>
      <Link href={`/tv?year=${year}`} className="w-full max-w-xs">
        <SecondaryButton text="Discover TV Shows" style="w-full text-lg py-3" />
      </Link>
    </div>
  );
}
