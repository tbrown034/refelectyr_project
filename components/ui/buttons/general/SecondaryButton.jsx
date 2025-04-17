const SecondaryButton = ({ style = "", text, onClick }) => (
  <button
    onClick={onClick}
    className={`
      cursor-pointer
      px-5 py-2.5 rounded-xl
      border-2 border-blue-600 dark:border-blue-500
      bg-white dark:bg-white
      text-blue-600 dark:text-blue-600
      font-medium
      hover:bg-blue-50 dark:hover:bg-blue-50
      active:bg-blue-100 dark:active:bg-blue-100
      shadow-sm hover:shadow-md
      transition-all duration-200 ease-in-out
      ${style}`}
  >
    {text}
  </button>
);

export default SecondaryButton;
