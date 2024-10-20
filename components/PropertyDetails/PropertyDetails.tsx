import prisma from "@/lib/db";
import { Property } from "@prisma/client";
import { Building, LandPlot, HousePlus, CalendarDays, Ruler, Hammer } from "lucide-react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { FaShower } from "react-icons/fa";
import { IoCubeOutline } from "react-icons/io5";
import { BsHouseExclamation } from "react-icons/bs";
import { LiaBedSolid } from "react-icons/lia";
import { MdOutlineVilla } from "react-icons/md";
import { PiGarage } from "react-icons/pi";
import Image from "next/image";
import avatar from "@/public/avatar.webp";
import PropertyDescription from "../PropertyDescription/PropertyDescription";
import Map from "../Map/Map";
import PropertySlider from "../PropertySlider/PropertySlider";
import WentWrong from "@/app/not-found";
import WhatsappButton from "../WhatsappButton/WhatsappButton";

export default async function PropertyDetails({ params }: { params: Params }) {
  const { propertyId } = params;
  const singleProperty = await getPropertyDetails(propertyId);
  const {
    images,
    isFunded,
    isNew,
    price,
    category,
    description,
    rooms,
    baths,
    size,
    state,
    city,
    neighborhood,
    kuulaId,
    latLong,
    floors,
  } = singleProperty as Property;

  function formatPrice(price: number) {
    return new Intl.NumberFormat("en-US").format(price).replace("MAD", "").trim();
  }

  function categorySymbol(cat: string) {
    if (cat === "appartment") return <Building strokeWidth={1.25} className="" />;
    if (cat === "garage") return <PiGarage strokeWidth={1.25} className="scale-150" />;
    if (cat === "villa") return <MdOutlineVilla className="scale-150" />;
    if (cat === "land") return <LandPlot strokeWidth={1.25} className="" />;
    if (cat === "house") return <HousePlus strokeWidth={1.25} className="scale-100" />;
    if (cat === "studio") return <IoCubeOutline strokeWidth={1.25} className="scale-150" />;
  }

  function agoDiff(days: number) {
    if (days < 31) return days === 1 ? `${Math.floor(days)} Day` : `${Math.floor(days)} Days`;

    if (days >= 31 && days < 365)
      return Math.floor(days / 31) === 1
        ? `${Math.floor(days / 31)} Month`
        : `${Math.floor(days / 31)} Months`;

    if (days >= 365)
      return Math.floor(days / 365) === 1
        ? `${Math.floor(days / 365)} Year`
        : `${Math.floor(days / 365)} Years`;
  }

  return (
    <div className="max-w-[1300px] mx-auto px-5 lg:px-10 space-y-4 mb-48 mt-6">
      {/* 360 + Images */}
      <div className="sm:px-5">
        <PropertySlider kuulaId={kuulaId} isNew={isNew} isFunded={isFunded} state={state} images={images} />
      </div>

      <div className="px-5">
        {/* Property Details */}
        <div className="space-y-6">
          <div className="flex flex-col gap-y-2 md:flex-row md:gap-y-0 justify-between">
            {/* Category & Location */}
            <div className="flex  md:items-center gap-x-2">
              <div className="w-4 h-4 hidden sm:block bg-[#0A801F] rounded-full mt-1 md:mt-0 mb-1 flex-shrink-0"></div>

              <div className="text-sm text-[#1A1816] font-medium leading-5 tracking-wide">
                {state === "forSale" && (
                  <h2 className="capitalize text-xl">
                    {category} for Sale in {neighborhood}, {city}
                  </h2>
                )}
                {state === "forRent" && (
                  <h2 className="capitalize text-xl">
                    {category} for Rent in {neighborhood}, {city}
                  </h2>
                )}
              </div>
            </div>

            {/* Price */}
            <p className="text-2xl font-bold">{formatPrice(Math.round(price))} DH</p>
          </div>

          <hr />

          {/* Host Section */}
          <div className="flex flex-col sm:flex-row gap-y-3 sm:gap-y-0 justify-between sm:items-center">
            <div className="hidden sm:flex items-center justify-between w-full">
              <div className="flex gap-x-2 items-center w-full">
                <Image src={avatar} alt="host image" className="w-10 h-10 rounded-full" />
                <div>
                  <h3 className="font-semibold">Hosted by Rachid</h3>
                  <p className="text-[#6A6A6A] text-[14px] font-normal">7 years hosting</p>
                </div>
              </div>

              <div>
                <WhatsappButton />
              </div>
            </div>

            <div className="sm:hidden fixed bottom-0 left-0 w-full z-20 flex gap-x-2 h-20 bg-white ">
              <div className="flex items-center justify-between px-4 w-full gap-x-6">
                <div className="flex gap-x-2 items-center flex-1">
                  <Image src={avatar} alt="host image" className="min-w-10 w-10 h-10 rounded-full" />
                  <div>
                    <h3 className="font-semibold">Rachid</h3>
                  </div>
                </div>

                <div className="flex-1">
                  <WhatsappButton />
                </div>
              </div>
            </div>
          </div>
        </div>

        <PropertyDescription description={description} />

        <hr />

        <div className="grid grid-cols-2 md:grid-cols-4 mb-6 gap-8 pt-4">
          {/* Category */}
          <div className="flex items-center gap-x-2">
            <div>{categorySymbol(category)}</div>
            <div>
              <h3 className="font-semibold capitalize">{category}</h3>
              <p className="text-[#6A6A6A] text-[14px] font-normal">Category</p>
            </div>
          </div>

          {/* Condition */}
          <div className="flex items-center gap-x-2">
            <div>
              <BsHouseExclamation size={20} />
            </div>
            <div>
              <h3 className="font-semibold">{isNew ? "New" : "Old"}</h3>
              <p className="text-[#6A6A6A] text-[14px] font-normal">Condition</p>
            </div>
          </div>

          {/* Floor */}
          {category !== "garage" && category !== "land" && (
            <div className="flex items-center gap-x-2">
              <div>
                <BsHouseExclamation size={20} />
              </div>
              <div>
                <h3 className="font-semibold">{floors}</h3>
                <p className="text-[#6A6A6A] text-[14px] font-normal">
                  {(category === "appartment" || category === "studio") && "Floor"}
                  {(category === "house" || category === "villa") && "Floors"}
                </p>
              </div>
            </div>
          )}

          {/* Age */}
          <div className="flex items-center gap-x-2">
            <div>
              <CalendarDays strokeWidth={1.25} />
            </div>
            <div>
              <h3 className="font-semibold">{agoDiff(62)}</h3>
              <p className="text-[#6A6A6A] text-[14px] font-normal">Posted</p>
            </div>
          </div>

          {/* Price per m³ */}
          <div className="flex items-center gap-x-2">
            <div>
              <Ruler strokeWidth={1.25} />
            </div>
            <div>
              <h3 className="font-semibold">{formatPrice(Math.round(price / size))} DH</h3>
              <p className="text-[#6A6A6A] text-[14px] font-normal">Price per m²</p>
            </div>
          </div>

          {/* Year built */}
          {category !== "land" && (
            <div className="flex items-center gap-x-2">
              <div>
                <Hammer strokeWidth={1.25} />
              </div>
              <div>
                <h3 className="font-semibold">2017</h3>
                <p className="text-[#6A6A6A] text-[14px] font-normal">Year built</p>
              </div>
            </div>
          )}

          {/* Rooms */}
          <div className="flex items-center gap-x-2">
            <div>
              <LiaBedSolid size={20} className="scale-125" />
            </div>
            <div>
              <h3 className="font-semibold">{rooms}</h3>
              <p className="text-[#6A6A6A] text-[14px] font-normal">Rooms</p>
            </div>
          </div>

          {/* Baths */}
          {category !== "land" && (
            <div className="flex items-center gap-x-2">
              <div>
                <FaShower size={20} />
              </div>
              <div>
                <h3 className="font-semibold">{baths}</h3>
                <p className="text-[#6A6A6A] text-[14px] font-normal">Baths</p>
              </div>
            </div>
          )}
        </div>

        <hr />

        <div className="text-sm text-[#1A1816] font-medium leading-5 tracking-wide pt-4">
          <h2 className="capitalize text-xl">Location</h2>

          <Map latLong={latLong} />
        </div>
      </div>
    </div>
  );
}

async function getPropertyDetails(propertyId: string) {
  try {
    const singleProperty = await prisma.property?.findFirst({
      where: {
        id: propertyId,
      },
      select: {
        images: true,
        isFunded: true,
        isNew: true,
        price: true,
        kuulaId: true,
        description: true,
        floors: true,
        latLong: true,
        category: true,
        rooms: true,
        baths: true,
        size: true,
        state: true,
        city: true,
        neighborhood: true,
        createdAt: true,
      },
    });

    // Error Handling
    if (!singleProperty || singleProperty === undefined || singleProperty === null) return <WentWrong />;

    return singleProperty;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return <WentWrong />;
  }
}
