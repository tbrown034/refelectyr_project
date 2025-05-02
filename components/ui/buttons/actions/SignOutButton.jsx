export const SignOut = () => {
  return (
    <form
      action={async () => {
        "use server";
        const { signOut } = await import("@/auth");
        await signOut();
      }}
    >
      <button
        type="submit"
        className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition"
      >
        Sign Out
      </button>
    </form>
  );
};
