"use client";

import type { Property } from "@prisma/client";
import PropertyCard from "../PropertyCard/PropertyCard";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";
import { getProperties } from "@/lib/actions";
import { PAGE_SIZE } from "@/lib/globalValues";

type PropertyMinus = Omit<
  Property,
  "latLong" | "kuulaId" | "floors" | "description" | "createdAt" | "ownerId"
>;

export function PropertySkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="w-full h-[320px] rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-[30px] w-[100px]" />
        <Skeleton className="h-[35px] w-[180px]" />
        <Skeleton className="h-[33px] w-[234px]" />
      </div>
    </div>
  );
}

export default function PropertyList({
  searchParams,
  properties,
  propertyCount,
}: {
  searchParams: any;
  propertyCount: number;
  properties: PropertyMinus[];
}) {
  const [shownProperties, setShownProperties] = useState(properties);
  const [page, setPage] = useState(2);

  async function loadMoreProperties() {
    const properties = await getProperties(searchParams, true, page); // 6-10
    setPage((prev) => prev + 1);
    setShownProperties((prev) => [...prev, ...properties]);
  }

  useEffect(() => {
    setShownProperties(properties);
    setPage(2);
  }, [searchParams]);

  const totalPages = Math.ceil(propertyCount / PAGE_SIZE);

  return (
    <section>
      <div className="mt-8 mb-14 grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 px-5 lg:px-10 ">
        {shownProperties?.map((property) => {
          return (
            <Suspense key={property.id} fallback={<PropertySkeleton />}>
              <PropertyCard property={property} />
            </Suspense>
          );
        })}
      </div>
      {shownProperties.length === PAGE_SIZE && (
        <div className="flex items-center justify-center">
          <button
            onClick={loadMoreProperties}
            className="bg-[#FF7B7F] text-white font-semibold rounded-lg px-4 py-2 hover:px-[17] transition-all
             hover:bg-[#e66f72]"
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
}
