/*
  Warnings:

  - Added the required column `like` to the `UserPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UserPlan` ADD COLUMN `like` INTEGER NOT NULL;
