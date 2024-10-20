"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { FcGoogle } from "react-icons/fc";

export default function GoogleAuthButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <button
          disabled
          className="flex items-center justify-center gap-x-2 bg-white clerkLogBtn w-full 
                  rounded-md py-[6px] px-3"
        >
          <Loader2 className="size-4 mr-2 animate-spin" color="gray" />
          <span className=" text-[#4b5563] text-sm font-semibold">Google</span>
        </button>
      ) : (
        <button
          className="flex items-center justify-center gap-x-2 bg-white clerkLogBtn w-full 
                    rounded-md py-[6px] px-3"
        >
          <FcGoogle size={16} />
          <span className=" text-[#4b5563] text-sm font-semibold">Google</span>
        </button>
      )}
    </>
  );
}
