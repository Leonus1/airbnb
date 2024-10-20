-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'MODERATOR');

-- CreateEnum
CREATE TYPE "PropertyCategory" AS ENUM ('appartment', 'garage', 'house', 'villa', 'land', 'studio');

-- CreateEnum
CREATE TYPE "PropertyState" AS ENUM ('forSale', 'forRent', 'sold');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "profileImage" TEXT,
    "role" "Role" NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "category" "PropertyCategory" NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "latLong" TEXT NOT NULL,
    "kuulaId" TEXT NOT NULL,
    "floors" INTEGER NOT NULL,
    "state" "PropertyState" NOT NULL,
    "price" INTEGER NOT NULL,
    "isFunded" BOOLEAN NOT NULL,
    "isNew" BOOLEAN NOT NULL,
    "size" INTEGER NOT NULL,
    "rooms" INTEGER NOT NULL,
    "baths" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
