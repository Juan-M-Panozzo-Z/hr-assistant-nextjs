/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `checkinout` table. All the data in the column will be lost.
  - Added the required column `checkType` to the `CheckInOut` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `checkinout` DROP COLUMN `updatedAt`,
    ADD COLUMN `checkType` VARCHAR(191) NOT NULL;
