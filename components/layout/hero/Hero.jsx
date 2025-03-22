import YearSelector from "@/components/ui/inputs/YearSelector";
import HeroCTA from "./HeroCTA";
import HeroText from "./HeroText";
import ScrollingMovies from "./scrollingMedia/ScrollingMovies";
import ScrollingTV from "./scrollingMedia/ScrollingTV";

const Hero = () => (
  <div className="flex flex-col justify-center items-center gap-6">
    <HeroText />
    <YearSelector navigateOnChange={false} />
    <h1>h1</h1>
    <HeroCTA />
    <ScrollingMovies />
    <ScrollingTV />
  </div>
);

export default Hero;
