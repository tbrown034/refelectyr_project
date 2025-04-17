const PrimaryButton = ({ style = "", text, onClick }) => (
  <button
    onClick={onClick}
    className={`
      cursor-pointer
      px-5 py-2.5 rounded-xl
      border-2 border-blue-600 dark:border-blue-500
      bg-blue-600 dark:bg-blue-500
      text-white
      font-semibold
      shadow-md hover:shadow-lg
      hover:bg-blue-700 dark:hover:bg-blue-600
      active:bg-blue-800 dark:active:bg-blue-700
      transition-all duration-200 ease-in-out
      ${style}`}
  >
    {text}
  </button>
);

export default PrimaryButton;
