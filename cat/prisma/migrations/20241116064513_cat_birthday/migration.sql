/*
  Warnings:

  - You are about to drop the column `age` on the `Cat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cat" DROP COLUMN "age",
ADD COLUMN     "birthday" TIMESTAMP(3);
