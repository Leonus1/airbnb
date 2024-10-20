import { categories } from "@/lib/data";
import { BedSingle, ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Slider } from "../ui/slider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdFilterList } from "react-icons/md";

export default function Filters({
  forWhat,
  resetFilters,
  isFilterClicked,
  setIsFilterClicked,
  selectedCategories,
  price,
  isFunded,
  size,
  isNew,
  rooms,
  maxPropertyPrice,
  maxPropertySize,
  maxPropertyRooms,
}: {
  forWhat: string;
  resetFilters: any;
  isFilterClicked: boolean;
  setIsFilterClicked: Dispatch<SetStateAction<boolean>>;
  selectedCategories: string[];
  price: number[];
  isFunded: string | null;
  size: number[];
  isNew: boolean | null;
  rooms: number[];
  maxPropertyPrice: number;
  maxPropertySize: number;
  maxPropertyRooms: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Filters
  const [tempSelectedCategories, setTempSelectedCategories] = useState<string[]>(selectedCategories);
  const [tempPrice, setTempprice] = useState<number[]>(price);
  const [tempIsFunded, setTempIsFunded] = useState<string | null>(isFunded);
  const [tempSize, setTempSize] = useState(size);
  const [tempIsNew, setTempIsNew] = useState<boolean | null>(isNew);
  const [tempRooms, setTempRooms] = useState(rooms);

  useEffect(() => {
    returnState();
  }, [rooms, isNew, size, isFunded, selectedCategories, price]);

  function formatPrice(price: number) {
    return new Intl.NumberFormat("en-US").format(price).replace("MAD", "").trim();
  }

  const formattedMin = formatPrice(+[tempPrice[0]]);
  const formattedMax = formatPrice(+[tempPrice[1]]);

  // On Return, Return UI to current state
  function returnState() {
    setTempSelectedCategories(selectedCategories);
    setTempprice(price);
    setTempIsFunded(isFunded);
    setTempSize(size);
    setTempIsNew(isNew);
    setTempRooms(rooms);
  }

  function transferState() {
    const params = new URLSearchParams(searchParams.toString());
    if (tempSelectedCategories.length !== 0) params.set("category", tempSelectedCategories.join(","));
    if (tempPrice[0] !== 0 || tempPrice[1] !== maxPropertyPrice) params.set("price", tempPrice.join(","));
    if (tempIsFunded !== null) params.set("isFunded", String(tempIsFunded));
    if (tempIsNew !== null) params.set("isNew", String(tempIsNew));
    if (tempSize[0] !== 0 || tempSize[1] !== maxPropertySize) params.set("size", tempSize.join(","));
    if (tempRooms[0] !== 0 || tempRooms[1] !== maxPropertyRooms) params.set("rooms", tempRooms.join(","));

    if (tempSelectedCategories.length === 0) params.delete("category");
    if (tempPrice[0] === 0 && tempPrice[1] === maxPropertyPrice) params.delete("price");
    if (tempIsFunded === null) params.delete("isFunded");
    if (tempIsNew === null) params.delete("isNew");
    if (tempSize[0] === 0 && tempSize[1] === maxPropertySize) params.delete("size");
    if (tempRooms[0] === 0 && tempRooms[1] === maxPropertyRooms) params.delete("rooms");

    const queryString = params.toString().replace(/%2C/g, ",");
    router.push(pathname + "?" + queryString);
  }

  return (
    <div
      className={`fixed z-20 select-none top-0 left-0 w-full h-screen bg-white ${
        !isFilterClicked && "translate-x-full"
      } transition-transform`}
    >
      <div className="text-black flex items-start justify-between mt-2 mx-5 lg:mx-10">
        <p className="font-bold flex items-center gap-x-2">
          <MdFilterList size={20} />
          Filters
        </p>
        <ChevronRight
          className="scale-110 cursor-pointer hover:text-[#FF9C9F]"
          onClick={() => {
            setIsFilterClicked(false);
            returnState();
          }}
        />
      </div>

      <hr className="mt-4" />

      {/* Filters */}
      <div className="mt-4 mx-5 lg:mx-10 space-y-4 mb-16">
        {/* Category */}
        <div className="space-y-2">
          <p className="font-semibold">Category</p>

          <div className="flex gap-x-3 gap-y-2 flex-wrap mt-2">
            {categories.map((category) => (
              <div
                key={category}
                className={`border-[1.8px] transition-colors hover:border-[#ff7b7f] hover:text-[#ff8c8f]
                hover:bg-[#ffefef] rounded-full py-2 px-3 font-medium cursor-pointer select-none capitalize ${
                  tempSelectedCategories.includes(category) && "border-[#ff7b7f] text-[#ff8c8f] bg-[#ffefef]"
                }`}
                onClick={() => {
                  if (tempSelectedCategories.includes(category)) {
                    const newtempSelectedCategories = tempSelectedCategories.filter(
                      (oldCategory) => oldCategory !== category
                    );
                    setTempSelectedCategories(newtempSelectedCategories);
                    return;
                  }
                  setTempSelectedCategories([...tempSelectedCategories, category]);
                }}
              >
                {category}
              </div>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <p className="font-semibold">Price</p>
          <div className="flex items-center justify-between">
            <span>{formattedMin} DH</span>
            <span>{formattedMax} DH</span>
          </div>
          <Slider
            value={tempPrice}
            min={0}
            defaultValue={tempPrice}
            max={maxPropertyPrice}
            step={5000}
            className="outline-none"
            onValueChange={(tempPrice: any) => {
              const [curMin, curMax] = tempPrice;
              return setTempprice([curMin, curMax]);
            }}
          />
        </div>

        {/* Funding */}
        {forWhat === "sale" && (
          <div className="space-y-2">
            <p className="font-semibold">Funding</p>

            <div className="flex gap-x-3 gap-y-2 flex-wrap mt-2">
              <div
                className={`border-[1.8px] transition-colors hover:border-[#ff7b7f] hover:text-[#ff8c8f]
                hover:bg-[#ffefef] rounded-full py-2 px-3 font-medium cursor-pointer select-none ${
                  tempIsFunded === "true" && "border-[#ff7b7f] text-[#ff8c8f] bg-[#ffefef]"
                }`}
                onClick={() => {
                  if (tempIsFunded === "true") return setTempIsFunded(null);
                  setTempIsFunded("true");
                }}
              >
                Funded
              </div>

              <div
                className={`border-[1.8px] transition-colors hover:border-[#ff7b7f] hover:text-[#ff8c8f]
                hover:bg-[#ffefef] rounded-full py-2 px-3 font-medium cursor-pointer select-none ${
                  tempIsFunded === "false" && "border-[#ff7b7f] text-[#ff8c8f] bg-[#ffefef]"
                }`}
                onClick={() => {
                  if (tempIsFunded === "false") return setTempIsFunded(null);
                  setTempIsFunded("false");
                }}
              >
                Not Funded
              </div>
            </div>
          </div>
        )}

        {/* Size */}
        <div className="space-y-2">
          <p className="font-semibold">Size</p>
          <div className="flex items-center justify-between">
            <span>{tempSize[0]} m³</span>
            <span>{tempSize[1]} m³</span>
          </div>
          <Slider
            value={tempSize}
            min={0}
            defaultValue={tempSize}
            max={maxPropertySize}
            step={10}
            className="outline-none"
            onValueChange={(tempSize: any) => {
              const [curMin, curMax] = tempSize;
              return setTempSize([curMin, curMax]);
            }}
          />
        </div>

        {/* Condition */}
        {forWhat === "sale" && (
          <div className="space-y-2">
            <p className="font-semibold">Condition</p>

            <div className="flex gap-x-3 gap-y-2 flex-wrap mt-2">
              <div
                className={`border-[1.8px] transition-colors hover:border-[#ff7b7f] hover:text-[#ff8c8f]
                hover:bg-[#ffefef] rounded-full py-2 px-3 font-medium cursor-pointer select-none ${
                  tempIsNew && "border-[#ff7b7f] text-[#ff8c8f] bg-[#ffefef]"
                }`}
                onClick={() => {
                  if (tempIsNew === true) return setTempIsNew(null);
                  setTempIsNew(true);
                }}
              >
                New
              </div>

              <div
                className={`border-[1.8px] transition-colors hover:border-[#ff7b7f] hover:text-[#ff8c8f]
                hover:bg-[#ffefef] rounded-full py-2 px-3 font-medium cursor-pointer select-none ${
                  tempIsNew === false && "border-[#ff7b7f] text-[#ff8c8f] bg-[#ffefef]"
                }`}
                onClick={() => {
                  if (tempIsNew === false) return setTempIsNew(null);
                  setTempIsNew(false);
                }}
              >
                Old
              </div>
            </div>
          </div>
        )}

        {/* Rooms */}
        <div className="space-y-2">
          <p className="font-semibold">Rooms</p>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <BedSingle />
              {tempRooms[0]}
            </span>
            <span className="flex items-center gap-2">
              <BedSingle />
              {tempRooms[1]}
            </span>
          </div>
          <Slider
            value={tempRooms}
            min={0}
            defaultValue={tempRooms}
            max={maxPropertyRooms}
            className="outline-none"
            onValueChange={(tempRooms) => {
              const [curMin, curMax] = tempRooms;
              return setTempRooms([curMin, curMax]);
            }}
          />
        </div>
      </div>

      <div className="fixed left-0 bottom-0 w-full bg-white border-t py-4 px-8 flex items-center gap-2">
        <button
          onClick={resetFilters}
          className="font-semibold border hover:bg-[#f3f3f3] transition-colors
          flex items-center justify-center gap-4 py-3 rounded-lg w-full"
        >
          Clear All
        </button>

        <button
          onClick={() => {
            transferState();
            setIsFilterClicked(false);
          }}
          className="bg-[#FF5A5F] hover:bg-[#ff6b6f] font-semibold text-white
          flex items-center justify-center gap-4 py-3 rounded-lg w-full"
        >
          Filter
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
