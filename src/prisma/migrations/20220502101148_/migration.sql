/*
  Warnings:

  - You are about to drop the column `userId` on the `EmailVerify` table. All the data in the column will be lost.
  - Added the required column `email` to the `EmailVerify` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `EmailVerify` DROP COLUMN `userId`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;
