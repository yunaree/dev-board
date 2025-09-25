/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Dashboard` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "DashboardType" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "Dashboard" ADD COLUMN     "description" VARCHAR(500),
ADD COLUMN     "iconId" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "type" "DashboardType" NOT NULL DEFAULT 'PRIVATE';

-- CreateIndex
CREATE UNIQUE INDEX "Dashboard_title_key" ON "Dashboard"("title");
