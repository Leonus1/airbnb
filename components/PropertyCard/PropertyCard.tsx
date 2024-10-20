import Image from "next/image";
import Link from "next/link";
import { LiaBedSolid } from "react-icons/lia";
import { FaShower } from "react-icons/fa";
import { RxDimensions } from "react-icons/rx";
import { TbView360Number } from "react-icons/tb";
import { Property } from "@prisma/client";

type PropertyMinus = Omit<
  Property,
  "latLong" | "kuulaId" | "floors" | "description" | "createdAt" | "ownerId"
>;

export default function PropertyCard({ property }: { property: PropertyMinus }) {
  const { images, isFunded, city, neighborhood, price, category, rooms, baths, size, state, isNew, id } =
    property;

  function formatPrice(price: number) {
    return new Intl.NumberFormat("en-US").format(price).replace("MAD", "").trim();
  }

  const formattedPrice = formatPrice(+price);

  const cover = images?.length > 0 ? images[0] : "fallback-image.jpg"; // replace "fallback-image.jpg" with your actual fallback image

  return (
    <div className="flex flex-col shadow-sm">
      <Link href={`/property/${id}`}>
        {/* IMAGE CONTAINER DIV */}
        <div className="relative overflow-hidden rounded-lg h-80 group">
          <Image
            src={
              `https://bldenfbpieqqgubbmnck.supabase.co/storage/v1/object/public/images/${cover}` as string
            }
            alt="propety image"
            fill
            className="h-full object-cover mb-3"
          />
          {/* LOCATION */}
          <div
            className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b 
            from-transparent to-[rgba(0,0,0,0.5)] text-white flex items-end justify-end p-4"
          >
            <p className="font-semibold capitalize">
              {neighborhood}, {city}
            </p>
          </div>
          {/* 360 HOVER */}
          <div
            className="opacity-0 scale-60 pointer-events-none flex group-hover:opacity-100 
            group-hover:scale-100 w-full h-full z-10 items-center justify-center transform transition-all
            duration-600 ease-in-out"
          >
            <TbView360Number size={44} className="text-white" />
          </div>

          {/* HOVERING BADGES */}
          <div className="absolute left-2 top-2 flex gap-x-2">
            {isNew && <div className="py-1 px-3 bg-white rounded-full font-medium">New</div>}
            {isFunded && state === "forSale" && (
              <div className="py-1 px-3 bg-[#0A801F] text-white rounded-full font-medium">Eligible</div>
            )}
          </div>
        </div>

        {/* DETAILS */}
        <div className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-1">
              <div className="w-3 h-3 bg-[#0A801F] rounded-full"></div>
              <p className="text-sm text-[#1A1816] font-normal leading-5 tracking-wide">
                <span className="capitalize">{category}</span> for {state === "forSale" ? "sale" : "rent"}
              </p>
            </div>
          </div>

          {state === "forSale" && <p className="font-bold text-2xl mt-2">{formattedPrice} DH</p>}
          {state === "forRent" && <p className="font-bold text-2xl mt-2">{formattedPrice} DH/mo</p>}

          <div className="mt-2 flex items-center gap-6 text-[#2b2b2b]">
            <div className="mt-2 flex items-center gap-2">
              <LiaBedSolid size={20} />
              <p>
                <span className="font-bold">{+rooms}</span>
              </p>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <FaShower size={20} />
              <p>
                <span className="font-bold">{+baths}</span>
              </p>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <RxDimensions size={20} />
              <p>
                <span className="font-bold">{+size}</span> m²
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
