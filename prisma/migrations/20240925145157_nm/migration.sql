/*
  Warnings:

  - You are about to drop the column `img` on the `Property` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_ownerId_fkey";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "img",
ADD COLUMN     "images" TEXT[];
