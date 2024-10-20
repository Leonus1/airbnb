"use client";

import Image from "next/image";
import notfound from "@/public/notfound.svg";

export default function NothingFound() {
  return (
    <section className="w-full px-2 h-[60vh] flex flex-col gap-y-14 justify-center items-center">
      <Image src={notfound} width={400} alt="airbnb logo" />
      <button
        onClick={() => window.history.back()}
        className="py-2 px-6 bg-[#FE5A5F] hover:bg-[#b23f43] transition-colors rounded-lg text-white
         font-semibold"
      >
        Go Back
      </button>
    </section>
  );
}
