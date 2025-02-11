/*
  Warnings:

  - Added the required column `code` to the `School` table without a default value. This is not possible if the table is not empty.
  - Added the required column `short` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "GossipEvent" ADD VALUE 'LOGIN';
ALTER TYPE "GossipEvent" ADD VALUE 'LOGOUT';
ALTER TYPE "GossipEvent" ADD VALUE 'RESET_PASSWORD';
ALTER TYPE "GossipEvent" ADD VALUE 'CHANGE_PASSWORD';

-- AlterEnum
ALTER TYPE "GossipModule" ADD VALUE 'AUTH';

-- AlterTable
ALTER TABLE "School" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "short" TEXT NOT NULL;
