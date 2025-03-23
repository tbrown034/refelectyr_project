// components/layout/hero/scrollingMedia/ScrollingMedia.jsx
import ScrollingMovies from "./ScrollingMovies";
import ScrollingTV from "./ScrollingTV";

const ScrollingMedia = async () => (
  <div className="flex flex-col gap-8 w-full">
    <ScrollingMovies />
    <ScrollingTV />
  </div>
);

export default ScrollingMedia;
