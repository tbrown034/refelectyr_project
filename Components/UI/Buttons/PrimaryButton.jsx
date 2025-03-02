const PrimaryButton = ({ style, text, onClick }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-lg border-2 border-black dark:border-white
      cursor-pointer hover:bg-slate-300 active:bg-slate-500 transition-colors duration-200 ease-in-out
      ${style}`}
  >
    {text}
  </button>
);

export default PrimaryButton;
