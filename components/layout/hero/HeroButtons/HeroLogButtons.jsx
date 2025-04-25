"use client";
export default function HeroLogButtons() {
  const handleLogin = () => {
    alert("Logged In! (Authentication coming soon)");
  };

  const handleSignUp = () => {
    alert("Signed Up! (Registration coming soon)");
  };

  return (
    <div className="flex flex-row justify-center items-center gap-3 px-4 mt-6 ">
      <button
        onClick={handleLogin}
        className="rounded-xl p-2 px-6 border-4 border-gray-600 cursor-pointer hover:bg-gray-700 active:scale-95 transition-all"
      >
        Log In
      </button>
      <button
        onClick={handleSignUp}
        className="rounded-xl p-2 px-4 hover:bg-blue-700 active:scale-95 transition-all bg-blue-600 text-white font-medium cursor-pointer border-4 border-blue-600 "
      >
        Sign Up
      </button>
    </div>
  );
}
