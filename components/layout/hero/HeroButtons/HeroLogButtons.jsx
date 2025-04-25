"use client";
export default function HeroLogButtons() {
  const handleLogin = () => {
    alert("Logged In! (Authentication coming soon)");
  };

  const handleSignUp = () => {
    alert("Signed Up! (Registration coming soon)");
  };

  return (
    <div className="flex flex-row justify-center items-center gap-3 px-4 mt-6 w-full">
      <button
        onClick={handleLogin}
        className="px-5 py-3 bg-gray-800 text-white font-semibold rounded-lg border-4 border-gray-600 hover:bg-gray-700 active:scale-95 transition-all cursor-pointer shadow-sm"
      >
        Log In
      </button>
      <button
        onClick={handleSignUp}
        className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg border border-blue-500 hover:bg-blue-700 active:scale-95 transition-all cursor-pointer shadow-sm"
      >
        Sign Up
      </button>
    </div>
  );
}
