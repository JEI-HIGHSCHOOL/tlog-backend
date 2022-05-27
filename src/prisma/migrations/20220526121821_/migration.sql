/*
  Warnings:

  - You are about to drop the column `plan_id` on the `UserPlan` table. All the data in the column will be lost.
  - You are about to drop the `Plans` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Plans` DROP FOREIGN KEY `Plans_userId_fkey`;

-- AlterTable
ALTER TABLE `UserPlan` DROP COLUMN `plan_id`;

-- DropTable
DROP TABLE `Plans`;

-- CreateTable
CREATE TABLE `Plan` (
    `id` VARCHAR(191) NOT NULL,
    `place_id` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `place_phone` VARCHAR(191) NOT NULL,
    `place_category_group_name` VARCHAR(191) NOT NULL,
    `place_address` VARCHAR(191) NOT NULL,
    `place_name` VARCHAR(191) NOT NULL,
    `planId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Plan` ADD CONSTRAINT `Plan_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `UserPlan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
