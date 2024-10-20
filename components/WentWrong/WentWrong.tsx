"use client";

import Image from "next/image";
import smwrong from "@/public/smwrong.svg";

export default function WentWrong() {
  return (
    <section className="w-full px-2 h-[80vh] flex flex-col gap-y-5 justify-center items-center">
      <Image src={smwrong} width={400} alt="airbnb logo" />
      <button
        onClick={() => location.reload()}
        className="py-2 px-6 bg-[#FE5A5F] hover:bg-[#b23f43] transition-colors rounded-lg text-white 
        lg:text-2xl font-semibold"
      >
        Try Again
      </button>
    </section>
  );
}
