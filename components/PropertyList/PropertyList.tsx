"use client";

import type { Property } from "@prisma/client";
import PropertyCard from "../PropertyCard/PropertyCard";
import { Suspense, useMemo } from "react";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";
import { getProperties } from "@/lib/actions";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { PAGE_SIZE } from "@/lib/globalValues";
import { Spinner } from "../Spinner/Spinner";

type PropertyMinus = Omit<
  Property,
  "latLong" | "kuulaId" | "floors" | "description" | "createdAt" | "ownerId"
>;

type SearchParams = {
  category: string | null;
  price: string | null;
  city: string | null;
  isFunded: string | null;
  size: string | null;
  isNew: string | null;
  rooms: string | null;
};

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
  properties,
  propertyCount,
}: {
  propertyCount: number;
  properties: PropertyMinus[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const totalPages = Math.ceil(propertyCount / PAGE_SIZE);

  const clientSearchParams = useSearchParams();

  const category = clientSearchParams.get("category") || "";
  const price = clientSearchParams.get("price") || "";
  const city = clientSearchParams.get("city") || "";
  const isFunded = clientSearchParams.get("isFunded") || "";
  const size = clientSearchParams.get("size") || "";
  const isNew = clientSearchParams.get("isNew") || "";
  const rooms = clientSearchParams.get("rooms") || "";

  const searchParams = useMemo(
    () => ({
      category,
      price,
      city,
      isFunded,
      size,
      isNew,
      rooms,
    }),
    [category, price, city, isFunded, size, isNew, rooms]
  );

  const [shownProperties, setShownProperties] = useState(properties);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();
  const [page, setPage] = useState(2);

  async function loadMoreProperties() {
    if (loading) return;
    setLoading(true);

    const properties = await getProperties(searchParams, true, page); // 6-10
    setPage((prev) => prev + 1);
    setShownProperties((prev) => [...prev, ...properties]);

    setLoading(false);
  }

  useEffect(() => {
    if (inView && !loading) {
      loadMoreProperties();
    }
  }, [inView, loading]);

  useEffect(() => {
    function buildQueryParams(params: SearchParams) {
      const urlSearchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value) urlSearchParams.set(key, value.toString());
      });
      return urlSearchParams;
    }

    const params = buildQueryParams(searchParams);
    router.push(pathname + "?" + params.toString(), { scroll: false });

    setShownProperties(properties);
    setPage(2);
  }, [searchParams, pathname, router, properties]);

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
      {page <= totalPages && !loading && (
        <div className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3" ref={ref}>
          <Spinner />
        </div>
      )}
    </section>
  );
}
