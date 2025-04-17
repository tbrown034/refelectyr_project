const SecondaryButton = ({ style = "", text, onClick }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2.5 rounded-xl border-2 border-black dark:border-white
      font-medium text-black dark:text-white
      bg-transparent dark:bg-transparent
      hover:bg-slate-200 dark:hover:bg-slate-700
      active:bg-slate-400 dark:active:bg-slate-600
      shadow-sm hover:shadow-md
      transition-all duration-200 ease-in-out
      ${style}`}
  >
    {text}
  </button>
);

export default SecondaryButton;
