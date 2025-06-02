/*
  Warnings:

  - Added the required column `last_time_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "last_time_at" TIMESTAMP(3) NOT NULL;
