"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaHouse } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";

export default function UserMenu() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null); // Create a reference for the menu div

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div
      ref={menuRef}
      onClick={() => setIsUserMenuOpen((prev) => !prev)}
      className="relative rounded-full cursor-pointer p-2"
    >
      <FiUser size={22} color={isUserMenuOpen ? "#FF7B7F" : ""} />

      {/* USER MENU */}
      <div
        className={`bg-white absolute right-0 top-full mt-1 rounded-lg z-10 userMenuShadow 
            transform transition-all select-none duration-300 ease-in-out  ${
              isUserMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            }`}
      >
        <ul className="w-full font-semibold space-y-1">
          <Link
            href="/add"
            className="w-full cursor-pointer transition-colors px-6 py-2 text-left whitespace-nowrap 
            flex items-center gap-x-3"
          >
            <FaHouse size={18} /> Add Listing
          </Link>
          <hr />
          <li
            onClick={() => signOut()}
            className="w-full cursor-pointer transition-colors px-6 py-2 text-left whitespace-nowrap 
            flex items-center gap-x-3"
          >
            <IoLogOut size={20} /> Log Out
          </li>
        </ul>
      </div>
    </div>
  );
}
