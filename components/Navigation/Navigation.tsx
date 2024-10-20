"use client";

import { navElements } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const path = usePathname();

  return (
    <>
      {navElements.map(({ label, href }) => {
        return (
          <Link
            key={label}
            href={href}
            className={`py-2 px-6 ${
              path === href && "bg-[#fff0ef] "
            } hover:bg-[#fff0ef]  rounded-xl cursor-pointer`}
          >
            {label}
          </Link>
        );
      })}
    </>
  );
}
