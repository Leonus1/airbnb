"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface SliderType {
  isNew: boolean;
  isFunded: boolean;
  images: string[];
  state: string;
  kuulaId: string;
}

export default function PropertySlider({ isNew, isFunded, images, state, kuulaId }: SliderType) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const kuula = [
    <div key={kuulaId} className="w-full h-full absolute transition-transform duration-300">
      <iframe
        width="100%"
        height="100%"
        allow="xr-spatial-tracking; gyroscope; accelerometer"
        src={`https://kuula.co/share/collection/${kuulaId}?logo=1&info=1&fs=0&vr=0&sd=1&autorotate=0.16&thumbs=3&inst=0`}
      ></iframe>
    </div>,
  ];

  const sliderElements = [kuula, ...images];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderElements.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sliderElements.length) % sliderElements.length);
  };

  return (
    <div className="relative overflow-hidden rounded-lg w-full h-full">
      {/* Image Container */}
      <div className="w-full h-[600px] md:h-[650px] relative ">
        {/* BADGES */}
        <div className="absolute z-10 left-[50%] -translate-x-[50%] top-2 flex gap-x-2">
          {isNew && <div className="py-1 px-3 bg-white rounded-full shadow-md font-medium">New</div>}
          {isFunded && state === "forSale" && (
            <div className="py-1 px-3 bg-[#0A801F] text-white rounded-full font-medium">Eligible</div>
          )}
        </div>
        <div>
          {sliderElements.map((img: any, index: number) => {
            if (index === 0) {
              return (
                <div key={index}>
                  <div
                    className={`w-full h-full absolute transition-transform duration-300 ${
                      index === currentIndex ? "translate-x-0" : "translate-x-full"
                    }`}
                    style={{ transform: `translateX(${(index - currentIndex) * 100}%)` }}
                  >
                    <iframe
                      width="100%"
                      height="100%"
                      allow="xr-spatial-tracking; gyroscope; accelerometer"
                      src={`https://kuula.co/share/collection/${kuulaId}?logo=1&info=1&fs=0&vr=0&sd=1&autorotate=0.16&thumbs=3&inst=0`}
                    ></iframe>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className={`w-full h-full absolute transition-transform duration-300 ${
                    index === currentIndex ? "translate-x-0" : "translate-x-full"
                  }`}
                  style={{ transform: `translateX(${(index - currentIndex) * 100}%)` }}
                >
                  <Image
                    src={
                      `https://bldenfbpieqqgubbmnck.supabase.co/storage/v1/object/public/images/${img}` as string
                    }
                    alt={`Slide ${index}`}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            }
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 w-10 h-10 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 w-10 h-10 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
