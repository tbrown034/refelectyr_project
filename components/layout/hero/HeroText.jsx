const HeroText = () => (
  <div className="text-center space-y-4">
    <h1
      className="
      text-5xl md:text-6xl
      font-extrabold
      text-transparent
      bg-clip-text
      bg-gradient-to-r
      from-blue-600 via-blue-500 to-blue-400
      dark:from-blue-400 dark:via-blue-300 dark:to-blue-200
      tracking-tight
      leading-[1.1]
    "
    >
      Welcome to ReflectYr
    </h1>
    <p
      className="
      text-xl md:text-2xl
      text-slate-700
      dark:text-slate-300
      max-w-3xl
      mx-auto
      leading-relaxed
      font-medium
      px-4
    "
    >
      Your journey to reflect starts here. Capture, rank, and share your
      favorite entertainment moments of the year.
    </p>
  </div>
);

export default HeroText;
