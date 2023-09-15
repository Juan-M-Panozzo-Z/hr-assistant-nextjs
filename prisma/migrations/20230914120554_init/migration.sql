/*
  Warnings:

  - You are about to drop the column `fatherId` on the `Sector` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Sector` DROP COLUMN `fatherId`,
    ADD COLUMN `parentId` INTEGER NULL;
