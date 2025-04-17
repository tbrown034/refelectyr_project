const HeroText = () => (
  <div className="text-center py-4">
    <h1
      className="
      text-4xl md:text-5xl
      font-bold
      text-slate-900 dark:text-slate-50
      mb-4
      tracking-tight
      bg-gradient-to-r from-blue-600 to-blue-400
      bg-clip-text

      dark:from-blue-400 dark:to-blue-200
    "
    >
      Welcome to ReflectYr
    </h1>
    <p
      className="
      text-xl
      text-slate-700 dark:text-slate-300
      max-w-2xl
      mx-auto
      leading-relaxed
      px-4
    "
    >
      Your journey to reflect starts here. Don't wait. Start making your lists
      now!
    </p>
  </div>
);

export default HeroText;
