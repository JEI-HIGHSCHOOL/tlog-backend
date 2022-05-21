/*
  Warnings:

  - You are about to drop the column `userId` on the `EmailVerify` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `EmailVerify` DROP FOREIGN KEY `EmailVerify_userId_fkey`;

-- AlterTable
ALTER TABLE `EmailVerify` DROP COLUMN `userId`;
