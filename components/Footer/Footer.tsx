import airWhite from "@/public/airWhite.svg";
import Image from "next/image";
import { Bricolage_Grotesque } from "next/font/google";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

export default function Footer() {
  return (
    <footer className={`bg-[#cc6266] w-full py-6 pb-24 mt-10  ${bricolage.className} text-white`}>
      <Image src={airWhite} alt="airBnb logo" width={200} className="mb-10 -ml-4 md:hidden" />
      <div className="px-5 md:px-10 mt-4 grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Image src={airWhite} alt="airBnb logo" width={200} className="hidden md:block -ml-10" />

        <div>
          <h3 className="pb-2 font-semibold text-lg">Browse</h3>
          <ul>
            <Link href="/">
              <li>Home</li>
            </Link>
            <Link href="/">
              <li>Buy</li>
            </Link>
            <Link href="/rentals">
              <li>Rent</li>
            </Link>
          </ul>
        </div>

        <div>
          <h3 className="pb-2 font-semibold text-lg">Policy</h3>
          <ul>
            <Link href="/">
              <li>Privacy Policy</li>
            </Link>
            <Link href="/">
              <li>Terms of Service</li>
            </Link>
            <Link href="/">
              <li>Acceptable Use</li>
            </Link>
          </ul>
        </div>

        <div>
          <h3 className="pb-2 font-semibold text-lg">Socials</h3>
          <ul className="space-y-4">
            <Link href="/">
              <li className="flex items-center gap-x-2">
                <FaFacebook size={20} />
                Facebook
              </li>
            </Link>
            <Link href="/">
              <li className="flex items-center gap-x-2">
                <FaSquareInstagram size={20} />
                Instagram
              </li>
            </Link>
            <Link href="/">
              <li className="flex items-center gap-x-2">
                <BsTwitterX size={20} />
                Twitter
              </li>
            </Link>
          </ul>
        </div>

        <div>
          <h3 className="pb-2 font-semibold text-lg">Contact</h3>
          <ul className="space-y-1">
            <li className="flex items-center gap-x-2">
              <MdEmail size={20} /> kawazaki@gmail.com
            </li>
            <li className="flex items-center gap-x-2">
              <FaLocationDot size={20} />
              177 Lot Makhlouf, Deroua
            </li>
            <li className="flex items-center gap-x-2">Airbnb SARL, RC: 17789668</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
