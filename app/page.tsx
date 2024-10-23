import { SkeletonCard } from "@/components/SkeletonCard/SkeletonCard";
import PropertyList from "@/components/PropertyList/PropertyList";
import prisma from "@/lib/db";
import { Suspense } from "react";
import WentWrong from "@/components/WentWrong/WentWrong";
import SearchFilterBar from "@/components/SearchFilterBar/SearchFilterBar";
import { Property } from "@prisma/client";
import { getProperties } from "@/lib/actions";
import NothingFound from "@/components/NothingFound/NothingFound";

function SkeletonLoading() {
  return (
    <div className="grid PropertiesGrid gap-5 lg:gap-10 px-5 lg:px-10 mt-5">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}

export default async function Home({ searchParams }: { searchParams: Property }) {
  // Get Most Expensive Property Price
  const [{ price }] = await prisma.property.findMany({
    orderBy: {
      price: "desc",
    },
    take: 1,
    select: {
      price: true,
    },
  });

  // Get Max Property Size
  const [{ size }] = await prisma.property.findMany({
    orderBy: {
      size: "desc",
    },
    take: 1,
    select: {
      size: true,
    },
  });

  // Get Max Property Size
  const [{ rooms }] = await prisma.property.findMany({
    orderBy: {
      rooms: "desc",
    },
    take: 1,
    select: {
      rooms: true,
    },
  });

  return (
    <div>
      <SearchFilterBar
        forWhat="sale"
        maxPropertyPrice={price ?? 1000000}
        maxPropertySize={size ?? 5000}
        maxPropertyRooms={rooms ?? 20}
      />
      <Suspense fallback={<SkeletonLoading />}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ShowItems({ searchParams }: { searchParams: any }) {
  try {
    const properties = await getProperties(searchParams, true, 1);
    const propertyCount = await prisma.property.count();

    // 404
    if (!properties) return <WentWrong />;

    // Not Found
    if (properties.length < 1) return <NothingFound />;

    return <PropertyList searchParams={searchParams} propertyCount={propertyCount} properties={properties} />;
  } catch (error) {
    return <WentWrong />;
  }
}
