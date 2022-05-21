-- DropForeignKey
ALTER TABLE `Plans` DROP FOREIGN KEY `Plans_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserPlan` DROP FOREIGN KEY `UserPlan_userId_fkey`;

-- AlterTable
ALTER TABLE `Plans` MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `UserPlan` MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Plans` ADD CONSTRAINT `Plans_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPlan` ADD CONSTRAINT `UserPlan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
