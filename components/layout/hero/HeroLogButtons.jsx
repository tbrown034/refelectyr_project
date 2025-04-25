"use client";
export default function HeroLogButtons() {
  const handleLogin = () => {
    alert("Logged In! (Authentication coming soon)");
  };

  const handleSignUp = () => {
    alert("Signed Up! (Registration coming soon)");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 px-4 mt-6">
      <button
        onClick={handleLogin}
        className="flex-1 px-6 py-3 bg-gray-700 text-white font-medium rounded-xl hover:bg-gray-600 active:scale-95 transition-all cursor-pointer"
      >
        Log In
      </button>
      <button
        onClick={handleSignUp}
        className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 active:scale-95 transition-all cursor-pointer"
      >
        Sign Up
      </button>
    </div>
  );
}
