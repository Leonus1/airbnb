"use client";

import { ChevronRight, Navigation, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import Filters from "../Filters/Filters";
import CitiesPicker from "../CitiesPicker/CitiesPicker";
import { useSearchParams } from "next/navigation";
import FilterBadges from "../FilterBadges/FilterBadges";
import { useRouter, usePathname } from "next/navigation";

export default function SearchFilterBar({
  forWhat,
  maxPropertyPrice,
  maxPropertySize,
  maxPropertyRooms,
}: {
  forWhat: string;
  maxPropertyPrice: number;
  maxPropertySize: number;
  maxPropertyRooms: number;
}) {
  const searchParams = useSearchParams();
  const [isFilterClicked, setIsFilterClicked] = useState(false);
  const [isCitiesPickerSelected, setIsCitiesPickerSelected] = useState(false);

  // Filters
  const paramCities = searchParams.get("city")?.split(",") ?? [];
  const paramCategories = searchParams.get("category")?.split(",") ?? [];
  const paramPrice = searchParams.get("price")?.split(",").map(Number) ?? [0, maxPropertyPrice];
  const paramIsFunded = searchParams.get("isFunded");
  const ParamSize = searchParams.get("size")?.split(",").map(Number) ?? [0, maxPropertySize];
  const ParamIsNew = searchParams.get("isNew") === null ? null : Boolean(searchParams.get("isNew"));
  const paramRooms = searchParams.get("rooms")?.split(",").map(Number) ?? [0, maxPropertyRooms];

  const router = useRouter();
  const pathname = usePathname();

  function resetFilters() {
    router.push(pathname);
    setIsFilterClicked(false);
  }

  return (
    <div className="lg:mx-10 mt-5">
      <div className="mx-5 lg:mx-0 flex items-center justify-between gap-x-1">
        {/* City */}
        <div className="space-y-2 cursor-pointer flex-1" onClick={() => setIsCitiesPickerSelected(true)}>
          <div className="w-full rounded-md py-2 px-3 bg-gray-50 flex items-center justify-between">
            <div className="flex-1 flex items-center gap-x-3">
              <div className="h-10 w-10 min-w-10 flex items-center justify-center rounded-full bg-[#ffefef]">
                <Navigation className="fill-[#ff7b7f] text-[#ff7b7f]" />
              </div>
              <div className="font-medium line-clamp-1">
                {paramCities.length !== 0 ? paramCities.join(", ") : "All Cities"}
              </div>
            </div>
            <ChevronRight className="scale-110" />
          </div>
        </div>
        <CitiesPicker
          isCitiesPickerSelected={isCitiesPickerSelected}
          setIsCitiesPickerSelected={setIsCitiesPickerSelected}
          selectedCities={paramCities}
        />
        {/* Filter */}
        <SlidersHorizontal
          className={`cursor-pointer ${
            searchParams.size > 0 && "text-[#FF5A5F]"
          } hover:text-[#FF5A5F] transition-colors`}
          onClick={() => setIsFilterClicked((prev) => !prev)}
        />
        {/* Filter Sidebar */}
        <Filters
          forWhat={forWhat}
          resetFilters={resetFilters}
          selectedCategories={paramCategories}
          price={paramPrice}
          isFunded={paramIsFunded}
          size={ParamSize}
          isNew={ParamIsNew}
          rooms={paramRooms}
          isFilterClicked={isFilterClicked}
          setIsFilterClicked={setIsFilterClicked}
          maxPropertyPrice={maxPropertyPrice}
          maxPropertySize={maxPropertySize}
          maxPropertyRooms={maxPropertyRooms}
        />
      </div>
      <FilterBadges
        price={paramPrice}
        isFunded={paramIsFunded}
        isNew={ParamIsNew}
        rooms={paramRooms}
        size={ParamSize}
        selectedCategories={paramCategories}
        maxPropertyPrice={maxPropertyPrice}
        maxPropertySize={maxPropertySize}
        maxPropertyRooms={maxPropertyRooms}
      />
    </div>
  );
}
