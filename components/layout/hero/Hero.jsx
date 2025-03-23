// components/layout/hero/Hero.jsx
import YearSelector from "@/components/ui/inputs/YearSelector";
import HeroCTA from "./HeroCTA";
import HeroText from "./HeroText";
import ScrollingMovies from "./scrollingMedia/ScrollingMovies";
import ScrollingTV from "./scrollingMedia/ScrollingTV";

const Hero = () => (
  <div className="flex flex-col items-center">
    {/* Hero text section with fixed width */}
    <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
      <HeroText />
      <div className="my-6">
        <YearSelector navigateOnChange={false} className="w-full max-w-xs" />
      </div>
      <HeroCTA />
    </div>

    {/* Full-width scrolling sections */}
    <div className="w-full px-4 py-6 space-y-12">
      <ScrollingMovies />
      <ScrollingTV />
    </div>
  </div>
);

export default Hero;
