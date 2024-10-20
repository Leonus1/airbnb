"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createProperty } from "@/lib/actions";
import CreationSubmit from "@/components/CreationSubmit/CreationSubmit";
import { useToast } from "@/components/ui/use-toast";
import { categoryItems } from "@/lib/categoryItems";
import { RxDimensions } from "react-icons/rx";
import { LiaBedSolid } from "react-icons/lia";
import { FaRegImage, FaShower } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";
import { IoPricetagsOutline } from "react-icons/io5";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TbGpsFilled, TbView360Number } from "react-icons/tb";

export default function ListingForm({ ownerId }: { ownerId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string>("appartment");
  const [city, setCity] = useState("Deroua");
  const [state, setState] = useState("forSale");
  const [isNew, setIsNew] = useState(false);
  const [isFunded, setIsFunded] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  const { toast } = useToast();

  async function formSubmitter(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsSubmitting(true);

    const data = new FormData(e.currentTarget);

    try {
      await createProperty(data as FormData);
      // Handle success
    } catch (error) {
      // Handle error
      toast({
        title: "Something went wrong!",
        description: "try again in a few minutes...",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Housing Handler
  function handleIsFundedClick() {
    setIsFunded((prev) => !prev);
  }

  // Condition Handler
  function handleIsNewClick() {
    setIsNew((prev) => !prev);
  }

  // Image Picker Handler
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles); // Convert FileList to File[]
      setImages(filesArray); // Add new files to existing images
    }
  }

  return (
    <>
      <form onSubmit={formSubmitter} className="px-5 lg:px-10 mt-5">
        {/* Form Fields */}
        <div className="mt-10 sm:w-[80%] md:w-[60%]  mx-auto space-y-6 mb-36">
          {/* OWNER ID */}
          <input type="text" hidden value={ownerId} id="ownerId" name="ownerId" />

          {/* CATEGORY */}
          <div className="space-y-2">
            <input type="text" hidden value={selectedCategory} name="category" />
            <label htmlFor="category" className="block text-xl text-[#5F5F5F] font-semibold">
              <span className="text-[#FF5A5F] font-bold">*</span> Category
            </label>
            <div className="grid sm:grid-cols-2 sm:gap-x-4 lg:grid-cols-3 gap-y-4">
              {categoryItems.map(({ name, id }) => {
                return (
                  <div
                    key={id}
                    onClick={() => setSelectedCategory(name)}
                    className={`border font-medium px-8 py-3 flex items-center justify-center rounded-lg 
              ${selectedCategory === name && "bg-[#FF5A5F] font-semibold text-white"} cursor-pointer`}
                  >
                    {name}
                  </div>
                );
              })}
            </div>
          </div>
          {/* OTHER INFO */}
          <div className="space-y-8">
            {/* CITY & NEIGHBORHOOD */}
            <div className="flex flex-col lg:flex-row sm:gap-x-4 gap-y-4">
              <div className="space-y-2 w-full">
                <label htmlFor="city" className="block text-xl text-[#5F5F5F] font-semibold ">
                  <span className="text-[#FF5A5F] font-bold">*</span> City
                </label>
                <Select onValueChange={(value) => setCity(value)}>
                  <input type="select" hidden value={city} id="city" name="city" />
                  <SelectTrigger
                    value="Deroua"
                    className="focus-visible:ring-transparent py-6 focus:ring-[#FF5A5F] "
                  >
                    <SelectValue placeholder="Deroua" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deroua" className="cursor-pointer">
                      Deroua
                    </SelectItem>
                    <SelectItem value="berrechid" className="cursor-pointer">
                      Berrechid
                    </SelectItem>
                    <SelectItem value="nouaceur" className="cursor-pointer">
                      Nouaceur
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 w-full">
                <label htmlFor="city" className="block text-xl text-[#5F5F5F] font-semibold ">
                  <span className="text-[#FF5A5F] font-bold">*</span> Neighborhood
                </label>
                <input
                  type="text"
                  id="neighborhood"
                  name="neighborhood"
                  placeholder="Maarif"
                  className="w-full border font-medium p-3 text-base placeholder:font-light outline-[#FF5A5F] 
              rounded-lg border-[#DADBDD] "
                />
              </div>
            </div>
            {/* Lat & Long */}
            <div className="flex flex-col lg:flex-row sm:gap-x-4 gap-y-4">
              <div className="space-y-2 w-full">
                <label
                  htmlFor="latLong"
                  className="text-xl text-[#5F5F5F] font-semibold flex items-center gap-x-2"
                >
                  <span className="text-[#FF5A5F] font-bold">*</span> <TbGpsFilled size={24} color="#000" />
                  Lat & Long
                </label>
                <input
                  type="text"
                  id="latLong"
                  name="latLong"
                  placeholder="33.38613183321193, -7.532384923835168"
                  className="w-full border px-3 font-medium text-base placeholder:font-light outline-[#FF5A5F] 
              rounded-lg py-3 border-[#DADBDD]"
                />
              </div>
            </div>
            {/* Kuula Id & Floor Number */}
            <div className="flex flex-col lg:flex-row sm:gap-x-4 gap-y-4">
              <div className="space-y-2 w-full">
                <label
                  htmlFor="kuulaId"
                  className="text-xl text-[#5F5F5F] font-semibold flex items-center gap-x-2"
                >
                  <span className="text-[#FF5A5F] font-bold">*</span>
                  <TbView360Number size={24} color="#000" />
                  Kuula ID
                </label>
                <input
                  id="kuulaId"
                  name="kuulaId"
                  type="text"
                  className="w-full p-3 border font-medium text-base placeholder:font-light outline-[#FF5A5F] 
              rounded-lg border-[#DADBDD] resize-none"
                  placeholder="7Kul4a"
                />
              </div>

              {selectedCategory !== "land" && selectedCategory !== "garage" && (
                <div className="space-y-2 w-full">
                  <label
                    htmlFor="floor"
                    className="text-xl text-[#5F5F5F] font-semibold flex items-center gap-x-2"
                  >
                    <span className="text-[#FF5A5F] font-bold">*</span>
                    {(selectedCategory === "appartment" || selectedCategory === "studio") && "Floor"}
                    {(selectedCategory === "house" || selectedCategory === "villa") && "Number of Floors"}
                  </label>
                  <input
                    type="number"
                    id="floor"
                    name="floor"
                    placeholder="3"
                    className="w-full border px-3 font-medium text-base placeholder:font-light outline-[#FF5A5F] 
            rounded-lg py-3 border-[#DADBDD]"
                  />
                </div>
              )}
            </div>
            {/* STATE (For Sale / Rent // Sold) */}
            {selectedCategory !== "land" && (
              <div className="space-y-2">
                <label htmlFor="state" className="block text-xl text-[#5F5F5F] font-semibold ">
                  <span className="text-[#FF5A5F] font-bold">*</span> State
                </label>
                <Select onValueChange={(value) => setState(value)}>
                  <input type="select" hidden value={state} id="state" name="state" />
                  <SelectTrigger
                    value="forSale"
                    className="focus-visible:ring-transparent py-6 focus:ring-[#FF5A5F] "
                  >
                    <SelectValue placeholder="For Sale" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="forSale" className="cursor-pointer">
                      For Sale
                    </SelectItem>
                    <SelectItem value="forRent" className="cursor-pointer">
                      For Rent
                    </SelectItem>
                    <SelectItem value="sold" className="cursor-pointer">
                      Sold
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {/* PRICE */}
            <div className="space-y-2">
              <label
                htmlFor="price"
                className="text-xl text-[#5F5F5F] font-semibold flex items-center gap-x-2"
              >
                <span className="text-[#FF5A5F] font-bold">*</span>
                <IoPricetagsOutline size={24} color="#000" />
                Price (DH)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="420000 DH"
                className="w-full border px-3 font-medium text-base placeholder:font-light outline-[#FF5A5F] 
              rounded-lg py-3 border-[#DADBDD] "
              />
            </div>
            {/* Housing Support & Condition ✅/❌ */}
            <div className="flex flex-col sm:flex-row sm:gap-x-8 gap-y-8">
              {(selectedCategory === "appartment" ||
                selectedCategory === "house" ||
                selectedCategory === "villa") && (
                <div className="space-y-2 w-full">
                  <label htmlFor="isFunded" className="block text-xl text-[#5F5F5F] font-semibold ">
                    <span className="text-[#FF5A5F] font-bold">*</span> Housing Support
                  </label>
                  <div
                    className={`w-24 h-8 cursor-pointer justify-start duration-500 rounded-full flex items-center 
              transition-all px-1 ${isFunded ? "justify-end bg-[#FF5A5F]" : "bg-[#ff9c9f]"}`}
                    onClick={handleIsFundedClick}
                  >
                    <input type="checkbox" id="isFunded" checked={isFunded} hidden name="isFunded" />
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                </div>
              )}

              {selectedCategory !== "land" && (
                <div className="space-y-2 w-full">
                  <label htmlFor="isNew" className="block text-xl text-[#5F5F5F] font-semibold ">
                    <span className="text-[#FF5A5F] font-bold">*</span> New
                  </label>
                  <div
                    className={`w-24 h-8 cursor-pointer justify-start duration-500 rounded-full flex items-center 
              transition-all px-1 ${isNew ? "justify-end bg-[#FF5A5F]" : "bg-[#ff9c9f]"}`}
                    onClick={handleIsNewClick}
                  >
                    <input type="checkbox" id="isNew" checked={isNew} name="isNew" hidden />
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
            {/* SIZE */}
            <div className="space-y-2">
              <label
                htmlFor="size"
                className="text-xl text-[#5F5F5F] font-semibold flex items-center gap-x-2"
              >
                <span className="text-[#FF5A5F] font-bold">*</span> <RxDimensions size={22} color="#000" />{" "}
                Size (m²)
              </label>
              <input
                type="number"
                id="size"
                name="size"
                placeholder="80 m²"
                className="w-full border px-3 font-medium text-base placeholder:font-light outline-[#FF5A5F] 
              rounded-lg py-3 border-[#DADBDD] "
              />
            </div>
            {/* ROOMS & BATHS */}
            {selectedCategory !== "land" && (
              <div className="flex flex-col lg:flex-row sm:gap-x-4 gap-y-4">
                <div className="space-y-2 w-full">
                  <label
                    htmlFor="rooms"
                    className="text-xl text-[#5F5F5F] font-semibold flex items-center gap-x-2"
                  >
                    <span className="text-[#FF5A5F] font-bold">*</span>{" "}
                    <LiaBedSolid size={24} color="#000" />
                    Rooms
                  </label>
                  <input
                    type="number"
                    id="rooms"
                    name="rooms"
                    placeholder="3"
                    className="w-full border px-3 font-medium text-base placeholder:font-light outline-[#FF5A5F] 
              rounded-lg py-3 border-[#DADBDD]"
                  />
                </div>

                <div className="space-y-2 w-full">
                  <label
                    htmlFor="baths"
                    className="text-xl text-[#5F5F5F] font-semibold flex items-center gap-x-2"
                  >
                    <span className="text-[#FF5A5F] font-bold">*</span> <FaShower size={22} color="#000" />
                    Baths
                  </label>
                  <input
                    type="number"
                    id="baths"
                    name="baths"
                    placeholder="2"
                    className="w-full border px-3 font-medium text-base placeholder:font-light outline-[#FF5A5F] 
              rounded-lg py-3 border-[#DADBDD] "
                  />
                </div>
              </div>
            )}
            {/* DESCRIPTION */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-xl text-[#5F5F5F] font-semibold flex items-center gap-x-2"
              >
                <span className="text-[#FF5A5F] font-bold">*</span>
                <MdOutlineDescription size={24} color="#000" />
                Description
              </label>
              <textarea
                id="description"
                placeholder="House in a great location, for a negotiable price"
                name="description"
                className="w-full border px-3 font-medium text-base placeholder:font-light outline-[#FF5A5F] 
              rounded-lg py-3 border-[#DADBDD] h-36 resize-none"
              />
            </div>
            {/* IMAGE PICKER */}
            <div className="space-y-2">
              <label
                htmlFor="img"
                className="text-xl text-[#5F5F5F] font-semibold flex items-center gap-x-2"
              >
                <span className="text-[#FF5A5F] font-bold">*</span>
                <FaRegImage size={24} color="#000" />
                Cover
              </label>
              <input type="file" id="images" name="images" onChange={handleImageChange} multiple />
            </div>
            {images.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {images.map((image, index) => (
                  <div key={index} className=" h-40 w-56">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index}`}
                      className="rounded-xl w-full h-full"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-9 flex items-center justify-between">
            <Link
              href="/"
              className="bg-[#e6e6e6] font-semibold hover:bg-[#cfcfcf] transition-colors px-8 py-2 rounded-lg"
            >
              Back
            </Link>
            <CreationSubmit pending={isSubmitting} />
          </div>
        </div>
      </form>
    </>
  );
}
