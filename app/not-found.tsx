import Image from "next/image";
import airbnbLogo from "@/public/airbnbLogoSm.svg";
import Link from "next/link";

export default function WentWrong() {
  return (
    <section className="w-full h-[80vh] flex flex-col gap-y-5 justify-center items-center">
      <Image src={airbnbLogo} alt="airbnb logo" />
      <p className="text-4xl">Oops, This page could not be found!</p>
      <Link
        href="/"
        className="py-3 px-12 bg-[#FE5A5F] hover:bg-[#b23f43] transition-colors rounded-xl text-white text-2xl font-semibold"
      >
        Go Home
      </Link>
    </section>
  );
}
