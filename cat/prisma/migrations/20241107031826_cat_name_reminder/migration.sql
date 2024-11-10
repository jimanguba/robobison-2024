/*
  Warnings:

  - Added the required column `catName` to the `Reminder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reminder" ADD COLUMN     "catName" TEXT NOT NULL;
