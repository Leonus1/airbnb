import {
  BedDouble,
  Building,
  CircleDollarSign,
  HandCoins,
  HousePlus,
  LandPlot,
  PencilRuler,
  X,
} from "lucide-react";
import { PiGarage } from "react-icons/pi";
import { MdOutlineVilla } from "react-icons/md";
import { IoCubeOutline } from "react-icons/io5";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterBadges({
  selectedCategories,
  price,
  isFunded,
  isNew,
  size,
  rooms,
  maxPropertyPrice,
  maxPropertySize,
  maxPropertyRooms,
}: {
  selectedCategories: string[];
  price: number[];
  isFunded: string | null;
  isNew: boolean | null;
  size: number[];
  rooms: number[];
  maxPropertyPrice: number;
  maxPropertySize: number;
  maxPropertyRooms: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function categoryBadgesHandler(cat: string) {
    const params = new URLSearchParams(searchParams);
    const paramCategories = searchParams.get("category")?.split(",") ?? [];
    const newCategories = paramCategories.filter((category) => category !== cat);

    if (newCategories.length !== 0) {
      params.set("category", newCategories.join(","));
    } else {
      params.delete("category");
    }

    const queryString = params.toString().replace(/%2C/g, ",");
    router.push(`${pathname}?${queryString}`);
  }

  const priceIsChanged = price[0] !== 0 || price[1] !== maxPropertyPrice;
  function priceBadgeHandler() {
    const params = new URLSearchParams(searchParams);
    params.delete("price");
    const queryString = params.toString().replace(/%2C/g, ",");
    router.push(`${pathname}?${queryString}`);
  }

  function isFundedBadgeHandler() {
    const params = new URLSearchParams(searchParams);
    params.delete("isFunded");
    const queryString = params.toString().replace(/%2C/g, ",");
    router.push(`${pathname}?${queryString}`);
  }

  const sizeIsChanged = size[0] !== 0 || size[1] !== maxPropertySize;
  function sizeBadgeHandler() {
    const params = new URLSearchParams(searchParams);
    params.delete("size");
    const queryString = params.toString().replace(/%2C/g, ",");
    router.push(`${pathname}?${queryString}`);
  }

  function isNewBadgeHandler() {
    const params = new URLSearchParams(searchParams);
    params.delete("isNew");
    const queryString = params.toString().replace(/%2C/g, ",");
    router.push(`${pathname}?${queryString}`);
  }

  const RoomsAreChanged = rooms[0] !== 0 || rooms[1] !== maxPropertyRooms;
  function roomsBadgeHandler() {
    const params = new URLSearchParams(searchParams);
    params.delete("rooms");
    const queryString = params.toString().replace(/%2C/g, ",");
    router.push(`${pathname}?${queryString}`);
  }

  return (
    <div className="mt-2 px-5 lg:px-0  flex items-center gap-x-1 overflow-x-scroll hider font-medium">
      {selectedCategories.length > 0 &&
        selectedCategories.map((cat) => {
          return (
            <div
              key={cat}
              onClick={() => categoryBadgesHandler(cat)}
              className="flex capitalize select-none items-center bg-[#FFEFEF] hover:text-white hover:bg-[#ffbdbf] 
                      min-w-fit font-medium transition-colors rounded-full px-3 py-1 cursor-pointer"
            >
              {categorySymbol(cat)}
              <p className="min-w-fit">{cat}</p>
              <X className="scale-[70%] min-w-fit" />
            </div>
          );
        })}
      {priceIsChanged && (
        <div
          onClick={priceBadgeHandler}
          className="flex capitalize items-center select-none bg-[#FFEFEF] hover:text-white hover:bg-[#ffbdbf] 
                      min-w-fit font-medium transition-colors rounded-full px-3 py-1 cursor-pointer"
        >
          <CircleDollarSign strokeWidth={1.25} className="mr-2 w-full" />
          <p className="min-w-fit">
            {price[0]}-{price[1]} DH
          </p>
          <X className="scale-[60%] w-full" />
        </div>
      )}
      {isFunded !== null && (
        <div
          onClick={isFundedBadgeHandler}
          className="flex capitalize items-center select-none bg-[#FFEFEF] hover:text-white hover:bg-[#ffbdbf] 
                      min-w-fit font-medium transition-colors rounded-full px-3 py-1 cursor-pointer "
        >
          <HandCoins strokeWidth={1.25} className="mr-2 w-full" />
          {isFunded === "true" ? (
            <p className="min-w-fit">Funded</p>
          ) : (
            <p className="min-w-fit">Not Funded</p>
          )}
          <X className="scale-[60%] w-full" />
        </div>
      )}
      {sizeIsChanged && (
        <div
          onClick={sizeBadgeHandler}
          className="flex items-center select-none bg-[#FFEFEF] hover:text-white hover:bg-[#ffbdbf] 
                      min-w-fit font-medium transition-colors rounded-full px-3 py-1 cursor-pointer "
        >
          <PencilRuler strokeWidth={1.25} className="mr-2 w-full scale-90" />
          <p className="min-w-fit">
            {size[0]}-{size[1]} m³
          </p>
          <X className="scale-[60%] w-full" />
        </div>
      )}
      {isNew !== null && (
        <div
          onClick={isNewBadgeHandler}
          className="flex capitalize items-center select-none bg-[#FFEFEF] hover:text-white hover:bg-[#ffbdbf] 
                      min-w-fit font-medium transition-colors rounded-full px-3 py-1 cursor-pointer "
        >
          <HousePlus strokeWidth={1.25} className="mr-2 w-full" />
          {isNew && <p>New</p>}
          {isNew === false && <p className="min-w-fit">Old</p>}
          <X className="scale-[60%] w-full" />
        </div>
      )}
      {RoomsAreChanged && (
        <div
          onClick={roomsBadgeHandler}
          className="flex items-center bg-[#FFEFEF] select-none hover:text-white hover:bg-[#ffbdbf] 
                      min-w-fit font-medium transition-colors rounded-full px-3 py-1 cursor-pointer "
        >
          <BedDouble strokeWidth={1.25} className="mr-2 w-full scale-90" />
          <p className="min-w-fit">
            {rooms[0]}-{rooms[1]}
          </p>
          <X className="scale-[60%] w-full" />
        </div>
      )}
    </div>
  );
}

export function categorySymbol(cat: string) {
  if (cat === "appartment") return <Building strokeWidth={1.25} className="mr-2 w-full scale-75" />;
  if (cat === "garage") return <PiGarage strokeWidth={1.25} className="mr-2 w-full scale-125" />;
  if (cat === "villa") return <MdOutlineVilla className="mr-2 w-full scale-110" />;
  if (cat === "land") return <LandPlot strokeWidth={1.25} className="mr-2 w-full" />;
  if (cat === "house") return <HousePlus strokeWidth={1.25} className="mr-2 w-full scale-75" />;
  if (cat === "studio") return <IoCubeOutline strokeWidth={1.25} className="mr-2 w-full scale-125" />;
}
