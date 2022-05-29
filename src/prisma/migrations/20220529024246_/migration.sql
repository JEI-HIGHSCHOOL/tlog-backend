/*
  Warnings:

  - Added the required column `title` to the `UserPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `password` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `UserPlan` ADD COLUMN `title` VARCHAR(191) NOT NULL;
