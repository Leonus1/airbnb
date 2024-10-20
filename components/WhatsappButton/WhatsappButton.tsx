"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function WhatsappButton() {
  const [pending, setPending] = useState(false);

  const router = useRouter();

  function whatsappClicked() {
    setPending(true);
    router.push("https://wa.me/+212664982531");
  }

  return (
    <>
      {pending ? (
        <button
          disabled
          className="flex items-center justify-center gap-x-2 bg-white clerkLogBtn w-full 
                  rounded-md py-[6px] px-3"
        >
          <Loader2 className="size-4 mr-2 animate-spin" color="gray" />
          <span className=" text-[#4b5563] text-sm font-semibold">Whatsapp</span>
        </button>
      ) : (
        <button
          onClick={() => whatsappClicked()}
          className="flex items-center justify-center gap-x-2 bg-white clerkLogBtn w-full 
                    rounded-md py-[6px] px-3"
        >
          <FaWhatsapp size={16} color="#25D366" />
          <span className=" text-[#4b5563] text-sm font-semibold">Whatsapp</span>
        </button>
      )}
    </>
  );
}
