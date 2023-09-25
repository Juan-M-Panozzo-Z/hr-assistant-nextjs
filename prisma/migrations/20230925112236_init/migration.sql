/*
  Warnings:

  - You are about to drop the column `endDay` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `startDay` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `date` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Schedule` DROP COLUMN `endDay`,
    DROP COLUMN `startDay`,
    ADD COLUMN `date` VARCHAR(191) NOT NULL;
