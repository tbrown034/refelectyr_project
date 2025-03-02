import HeroCTA from "./HeroCTA";
import HeroText from "./HeroText";

export default function Hero() {
  return (
    <div className="flex flex-col gap-4">
      <HeroText />
      <HeroCTA />
    </div>
  );
}
