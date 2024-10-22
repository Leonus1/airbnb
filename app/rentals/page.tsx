import PropertyList from "@/components/PropertyList/PropertyList";
import SearchFilterBar from "@/components/SearchFilterBar/SearchFilterBar";
import { SkeletonCard } from "@/components/SkeletonCard/SkeletonCard";
import WentWrong from "@/components/WentWrong/WentWrong";
import prisma from "@/lib/db";
import { Property, PropertyCategory } from "@prisma/client";
import { Suspense } from "react";
import NothingFound from "@/components/NothingFound/NothingFound";

export default async function PropertiesForRentPage({ searchParams }: { searchParams: Property }) {
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
        forWhat="rent"
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

async function ShowItems({ searchParams }: { searchParams: Property }) {
  const { category, price, size, rooms, city } = searchParams;
  const categories = category ? category.split(",").map((cat) => cat as PropertyCategory) : [];

  // City Filter
  const cities = city ? city.split(",").map((city) => city) : [];

  // Price Filter
  const priceRange = String(price)?.split(",");
  const minPrice = +priceRange?.[0];
  const maxPrice = +priceRange?.[1];

  // size Filter
  const sizeRange = String(size)?.split(",");
  const minSize = +sizeRange?.[0];
  const maxSize = +sizeRange?.[1];

  // Rooms Filter
  const roomsRange = String(rooms)?.split(",");
  const minRooms = +roomsRange?.[0];
  const maxRooms = +roomsRange?.[1];

  // Category Safeguard
  function categoryChecker(category: string) {
    return Object.values(PropertyCategory)
      .map((key) => PropertyCategory[key])
      .filter((value) => value === category)[0];
  }
  const propertyCategories = categories
    .map((category: string) => categoryChecker(category))
    .filter((category) => category !== undefined);

  try {
    const propertyCount = await prisma.property.count();

    const properties = await prisma.property?.findMany({
      where: {
        state: "forRent",
        category:
          propertyCategories.length > 0
            ? {
                in: propertyCategories,
              }
            : undefined,
        city:
          cities.length > 0
            ? {
                in: cities,
                mode: "insensitive", // Default value: default
              }
            : undefined,
        price: {
          gte: minPrice ? minPrice : undefined,
          lte: maxPrice ? maxPrice : undefined,
        },
        size: {
          gte: minSize ? minSize : undefined,
          lte: maxSize ? maxSize : undefined,
        },
        rooms: {
          gte: minRooms ? minRooms : undefined,
          lte: maxRooms ? maxRooms : undefined,
        },
      },
      select: {
        images: true,
        price: true,
        category: true,
        rooms: true,
        baths: true,
        size: true,
        state: true,
        isFunded: true,
        isNew: true,
        city: true,
        neighborhood: true,
        id: true,
      },
    });

    // Error Handling
    if (!properties) return <WentWrong />;
    if (properties.length < 1) return <NothingFound />;

    return (
      <PropertyList searchParams={searchParams} propertyCount={propertyCount} properties={properties} />
    );
  } catch (error) {
    return <WentWrong />;
  }
}

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
