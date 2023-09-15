-- AlterTable
ALTER TABLE `Sector` ADD COLUMN `fatherId` INTEGER NULL,
    ADD COLUMN `isChildren` BOOLEAN NOT NULL DEFAULT false;
