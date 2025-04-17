const PrimaryButton = ({ style = "", text, onClick }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2.5 rounded-xl border-2 border-black dark:border-white
      font-semibold text-black dark:text-white
      bg-white/80 dark:bg-slate-800/70 backdrop-blur-md
      shadow-md hover:shadow-lg
      hover:bg-slate-200 dark:hover:bg-slate-700
      active:bg-slate-400 dark:active:bg-slate-600
      transition-all duration-200 ease-in-out
      ${style}`}
  >
    {text}
  </button>
);

export default PrimaryButton;
