export default function HeroText() {
  return (
    <div className="flex flex-col items-center text-center ">
      <h1
        className="text-5xl md:text-6xl font-bold tracking-tight max-w-3xl
                   bg-gradient-to-r from-slate-700 to-slate-900
                   dark:from-slate-300 dark:to-slate-100
                   bg-clip-text text-transparent pb-1"
      >
        Welcome to ReflectYr
      </h1>
      <p className="text-lg md:text-xl font-semibold text-slate-700 dark:text-slate-400 max-w-2xl mt-4">
        Make a list. Get custom recommendations. Find your next favorite movie
        or TV show.
      </p>
    </div>
  );
}
