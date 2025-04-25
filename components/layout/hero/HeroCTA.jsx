"use client";
export default function HeroCTA() {
  const handleLogin = () => {
    alert("Logged In! (Authentication coming soon)");
  };

  const handleSignUp = () => {
    alert("Signed Up! (Registration coming soon)");
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 w-full max-w-md mx-auto">
      <button
        onClick={handleLogin}
        className="flex-1 px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
      >
        Log In
      </button>
      <button
        onClick={handleSignUp}
        className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Sign Up
      </button>
    </div>
  );
}
