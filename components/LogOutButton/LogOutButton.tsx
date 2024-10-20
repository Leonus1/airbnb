import { signOut } from "next-auth/react";

export default function LogOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="rounded-xl transition-colors hover:bg-[#FF7B7F] py-2 px-6 hover:text-white font-semibold cursor-pointer "
    >
      Log out
    </button>
  );
}
