import Link from "next/link";
import UserMenu from "../UserMenu/UserMenu";
import { BsHouseAddFill } from "react-icons/bs";

type UserType = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

function RightSideMenu({ logInData }: { logInData: UserType | undefined }) {
  return (
    <section className="flex items-center justify-center">
      {!logInData && (
        <Link
          href="/login"
          className="py-2 px-2 rounded-xl bg-[#FF7B7F] hover:bg-[#ff9599] transition-colors
           text-white cursor-pointer font-semibold flex items-center gap-x-2"
        >
          <div className="md:hidden">
            <BsHouseAddFill size={24} />
          </div>
          <div className="hidden md:block">
            <p>Add Listing</p>
          </div>
        </Link>
      )}
      {logInData && <UserMenu />}
    </section>
  );
}
export default RightSideMenu;
