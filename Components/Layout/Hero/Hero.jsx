import YearSelector from "@/Components/UI/YearSelector";
import HeroCTA from "./HeroCTA";
import HeroText from "./HeroText";

const Hero = () => (
  <div className="flex flex-col justify-center items-center gap-4">
    <HeroText />
    <YearSelector navigateOnChange={false} />
    <HeroCTA />
  </div>
);

export default Hero;
