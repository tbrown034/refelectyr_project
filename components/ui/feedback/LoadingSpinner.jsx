// components/ui/feedback/LoadingSpinner.jsx
export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="relative w-16 h-16">
        {/* Outer circle */}
        <div className="absolute inset-0 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
        {/* Animated arc */}
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
        <div className="absolute inset-0 border-4 border-transparent border-l-blue-600 dark:border-l-blue-400 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
