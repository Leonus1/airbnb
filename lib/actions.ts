"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";
import { PropertyCategory } from "@prisma/client";
import { PAGE_SIZE } from "./globalValues";

export async function createProperty(formData: FormData) {
  const category = formData.get("category") as string;
  const city = formData.get("city") as string;
  const neighborhood = formData.get("neighborhood") as string;
  const latLong = formData.get("latLong") as string;
  const kuulaId = formData.get("kuulaId") as string;
  const floors = formData.get("floors");
  const state = formData.get("state");
  const price = formData.get("price");
  const isFunded = formData.get("isFunded");
  const isNew = formData.get("isNew");
  const size = formData.get("size");
  const rooms = formData.get("rooms");
  const baths = formData.get("baths");
  const description = formData.get("description") as string;
  const images = formData.getAll("images") as File[];
  const ownerId = formData.get("ownerId") as string;

  try {
    const imagePaths: string[] = [];

    for (const img of images) {
      const { data: imageData } = await supabase.storage
        .from("images")
        .upload(`${img.name}-${new Date()}`, img, {
          cacheControl: "2592000",
          contentType: img.type,
        });

      if (imageData?.path) {
        imagePaths.push(imageData.path);
      }
    }

    const propertyData = {
      data: {
        category,
        city: city,
        neighborhood,
        latLong,
        kuulaId,
        floors: Number(floors),
        state,
        price: Number(price),
        isFunded: Boolean(isFunded),
        isNew: Boolean(isNew),
        size: Number(size),
        rooms: Number(rooms),
        baths: Number(baths),
        description,
        images: imagePaths,
        ownerId,
      },
    };

    await prisma.property.create(propertyData as any);
  } catch (error) {
    throw new Error("Something went wrong!");
  } finally {
    revalidatePath("/");
    return redirect("/");
  }
}

export async function createLead(formData: FormData, email: string) {
  const category = formData.get("category") as string;
  const city = formData.get("city") as string;
  const neighborhood = formData.get("neighborhood") as string;
  const description = formData.get("description") as string;
  const fullName = formData.get("fullName") as string;
  const phoneNumber = formData.get("phoneNumber") as string;

  try {
    const leadData = {
      data: {
        category,
        city,
        neighborhood,
        description,
        fullName,
        phoneNumber,
        email,
      },
    };

    const uploadLead = await prisma.lead.create(leadData as any);
  } catch (error) {
    throw new Error("Something went wrong!");
  }

  return redirect("/");
}

export async function getProperties(
  {
    category,
    price,
    isFunded,
    size,
    isNew,
    rooms,
    city,
  }: {
    category: string | null;
    price: string | null;
    isFunded: string | null;
    size: string | null;
    isNew: string | null;
    rooms: string | null;
    city: string | null;
  },
  forSale: boolean = true,
  page: number = 1
) {
  // SKIP
  const skip = (page - 1) * PAGE_SIZE;

  // Category Filter
  const categories =
    typeof category === "string" && category
      ? category.split(",").map((cat) => cat as PropertyCategory)
      : [];

  // City Filter
  const cities = city ? city.split(",").map((city) => city) : [];

  // Price Filter
  const priceRange = String(price)?.split(",");
  const minPrice = +priceRange?.[0];
  const maxPrice = +priceRange?.[1];

  // isFunded Filter
  function stringToBoolean(str: string | boolean) {
    if (str === "true") {
      return true;
    } else if (str === "false") {
      return false;
    } else return undefined;
  }
  const isFundedBoo = stringToBoolean(isFunded as string);

  // size Filter
  const sizeRange = String(size)?.split(",");
  const minSize = +sizeRange?.[0];
  const maxSize = +sizeRange?.[1];

  // isNew Filter
  const isNewBoo = stringToBoolean(isNew as string);

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
    .map((category) => categoryChecker(category))
    .filter((category) => category !== undefined);

  try {
    // Fetch Properties
    const properties = await prisma.property?.findMany({
      where: {
        state: "forSale",
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
        isFunded: isFundedBoo,
        size: {
          gte: minSize ? minSize : undefined,
          lte: maxSize ? maxSize : undefined,
        },
        isNew: isNewBoo,
        rooms: {
          gte: minRooms ? minRooms : undefined,
          lte: maxRooms ? maxRooms : undefined,
        },
      },
      select: {
        id: true,
        images: true,
        isFunded: true,
        isNew: true,
        price: true,
        category: true,
        rooms: true,
        baths: true,
        size: true,
        state: true,
        city: true,
        neighborhood: true,
      },
      skip,
      take: PAGE_SIZE,
    });

    return properties;
  } catch (error) {
    return [];
  }
}
