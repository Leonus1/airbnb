import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import airbnbLogoSm from "@/public/airbnbLogoSm.svg";
import Image from "next/image";

import { Syne } from "next/font/google";
import GoogleAuthButton from "@/components/GoogleAuthButton/GoogleAuthButton";
import WhatsappButton from "@/components/WhatsappButton/WhatsappButton";
const syne = Syne({ subsets: ["latin"] });

export default async function Page() {
  const session = await auth();
  if (session?.user) redirect("/");

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh_-_80px)] bg-red-400 ">
      <div className="flex-1 hidden lg:flex items-center justify-center text-white">
        <h1 className={`${syne.className} text-8xl xl:text-9xl text-center font-semibold `}>
          Welcome to <span className="underline underline-offset-4">Airbnb</span>
        </h1>
      </div>
      <div className="flex-1 flex items-center justify-center mx-3">
        {/* Clerk Card */}
        <div className="bg-[#FAFAFA] rounded-lg p-10 clerkCard">
          <div className="w-full flex flex-col justify-center items-center gap-y-3">
            <Image src={airbnbLogoSm} alt="airbnb logo" />
            <div className="text-center space-y-1">
              <h3 className="font-semibold text-lg">Sign in to AirBnb</h3>
              <p className="text-sm text-[#747686] ">Please sign in to add new listings</p>
            </div>
          </div>

          <form
            className="mt-6"
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <GoogleAuthButton />
          </form>

          <div className="flex items-center w-full max-w-xs my-4">
            <div className="border-t border-gray-300 w-full"></div>
            <span className="px-3 text-[13px] text-[#747686] whitespace-nowrap">or contact us</span>
            <div className="border-t border-gray-300 w-full"></div>
          </div>

          <WhatsappButton />
        </div>
      </div>
    </div>
  );
}
