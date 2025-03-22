const AltButton = ({ style, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg border-2 dark:hover:bg-slate-700 dark:active:bg-slate-500 border-black dark:border-white
        cursor-pointer hover:bg-slate-300 active:bg-slate-500
        transition duration-200 ease-in-out ${style}`}
    >
      {text}
    </button>
  );
};

export default AltButton;
