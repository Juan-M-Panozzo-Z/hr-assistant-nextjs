-- AlterTable
ALTER TABLE `Shift` ADD COLUMN `sectorId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Shift` ADD CONSTRAINT `Shift_sectorId_fkey` FOREIGN KEY (`sectorId`) REFERENCES `Sector`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
