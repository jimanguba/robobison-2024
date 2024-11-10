/*
  Warnings:

  - Added the required column `reminderTime` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "reminderTime" TIMESTAMP(3) NOT NULL;
