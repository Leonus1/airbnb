import airbnbLogoLg from "@/public/airbnbLogoLg.svg";
import airbnbLogoSm from "@/public/airbnbLogoSm.svg";
import Image from "next/image";
import Link from "next/link";
import RightSideMenu from "../RightSideMenu/RightSideMenu";
import Navigation from "../Navigation/Navigation";

type UserType = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export default function Navbar({ user }: { user: UserType | undefined }) {
  // Check if LoggedIn
  const logInData = user;

  return (
    <header className="h-20 px-5 md:px-10  flex items-center justify-between">
      {/* NAVIGATION */}
      <div>
        {/* DESKTOP NAVIGATION */}
        <nav className="flex gap-x-3 md:gap-x-8 items-center w-full">
          <Link href="/">
            <Image src={airbnbLogoLg} alt="airbnb logo" width={180} className="hidden md:block" />
            <Image src={airbnbLogoSm} alt="airbnb logo" className="block min-w-8 md:hidden" />
          </Link>
          <ul className="space-x-2 font-semibold w-full flex">
            <Navigation />

            {logInData && (
              <Link
                key="Add Listing"
                href="/add"
                className="hidden md:flex py-2 px-6 items-center gap-x-2 bg-[#FF7B7F] text-white hover:bg-[#ff9599] transition-colors rounded-xl 
                cursor-pointer"
              >
                <p>Add Listing</p>
              </Link>
            )}
          </ul>
        </nav>
      </div>

      {/* USER/ADMIN MENU */}
      <RightSideMenu logInData={logInData} />
    </header>
  );
}
