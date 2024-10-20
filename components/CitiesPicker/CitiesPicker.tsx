import { cities } from "@/lib/data";
import { Check, ChevronDown, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function CitiesPicker({
  isCitiesPickerSelected,
  setIsCitiesPickerSelected,
  selectedCities,
}: {
  isCitiesPickerSelected: boolean;
  setIsCitiesPickerSelected: any;
  selectedCities: string[];
}) {
  // State
  const [tempCities, setTempCities] = useState<string[]>(selectedCities);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function transferState() {
    const params = new URLSearchParams(searchParams.toString());

    if (tempCities.length !== 0) {
      params.set("city", tempCities.join(","));
    } else {
      params.delete("city");
    }

    const queryString = params.toString().replace(/%2C/g, ",");
    router.push(pathname + "?" + queryString);
  }

  function clearCitiesFilter() {
    const params = new URLSearchParams(searchParams);

    params.delete("city");
    router.push(`?${params.toString().replace(/%2C/g, ",")}`);
    setIsCitiesPickerSelected(false);
  }

  useEffect(() => {
    setTempCities(selectedCities);
  }, [selectedCities]);

  function tempCityClicked(city: string) {
    const isSelected = tempCities.includes(city);

    if (isSelected) {
      const newTempCities = tempCities.filter((oldCity) => oldCity !== city);
      setTempCities(newTempCities);
    }

    if (!isSelected) setTempCities((prev: string[]) => [...prev, city]);
  }

  return (
    <div>
      {isCitiesPickerSelected && (
        <div
          className="fixed z-30 top-0 left-0 w-full h-screen bg-black opacity-20 cursor-pointer"
          onClick={() => {
            setIsCitiesPickerSelected(false);
            setTempCities(selectedCities);
          }}
        ></div>
      )}
      {/* Cities */}
      <div
        className={`fixed z-30 top-[20%] left-0 w-full h-[80%] ${
          !isCitiesPickerSelected && "translate-y-full"
        } transition-transform duration-200 bg-white rounded-t-lg`}
      >
        <div className="flex flex-col h-full">
          <div className="text-black flex items-start justify-between mt-5 mx-5 lg:mx-10">
            <p className="font-bold">City</p>
            <ChevronDown
              className="cursor-pointer hover:text-[#FF9C9F] scale-110"
              onClick={() => setIsCitiesPickerSelected(false)}
            />
          </div>

          <hr className="mt-4" />

          <div className="flex-1 my-4 overflow-y-auto mb-24">
            {cities.map(({ city, id }) => (
              <div
                key={city}
                onClick={() => tempCityClicked(city)}
                className="cursor-pointer select-none mx-5 lg:mx-10 px-2 py-3 rounded-lg hover:bg-[#ffefef] transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-x-3">
                    <div
                      className={`${
                        tempCities.includes(city) && "bg-[#FF9C9F] border-none"
                      } w-6 h-6 border border-black rounded-sm flex items-center justify-center`}
                    >
                      {tempCities.includes(city) && <Check className="text-white" />}
                    </div>
                    <h2 className="font-medium text-lg">{city}</h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fixed left-0 flex gap-x-2 bottom-0 w-full bg-white border-t py-4 px-8">
          <button
            onClick={clearCitiesFilter}
            className="font-semibold border hover:bg-[#f3f3f3] transition-colors
          flex items-center justify-center gap-4 py-3 rounded-lg w-full"
          >
            Clear Cities
          </button>

          <button
            onClick={() => {
              setIsCitiesPickerSelected(false);
              transferState();
            }}
            className="bg-[#FF5A5F] hover:bg-[#ff6b6f] font-semibold text-white
          flex items-center justify-center gap-4 py-3 rounded-lg w-full"
          >
            Filter
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
