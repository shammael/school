/*
  Warnings:

  - You are about to drop the column `createdAt` on the `UserRoleBinding` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `UserRoleBinding` table. All the data in the column will be lost.
  - You are about to drop the `StudentEvaluation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MediaToStudentEvaluation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `UserRole` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `UserRoleBinding` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- DropForeignKey
ALTER TABLE "StudentEvaluation" DROP CONSTRAINT "StudentEvaluation_evaluation_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentEvaluation" DROP CONSTRAINT "StudentEvaluation_user_id_fkey";

-- DropForeignKey
ALTER TABLE "_MediaToStudentEvaluation" DROP CONSTRAINT "_MediaToStudentEvaluation_A_fkey";

-- DropForeignKey
ALTER TABLE "_MediaToStudentEvaluation" DROP CONSTRAINT "_MediaToStudentEvaluation_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "UserStatus" NOT NULL;

-- AlterTable
ALTER TABLE "UserRole" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UserRoleBinding" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "StudentEvaluation";

-- DropTable
DROP TABLE "_MediaToStudentEvaluation";

-- CreateTable
CREATE TABLE "UserEvaluation" (
    "id" TEXT NOT NULL,
    "evaluation_id" TEXT NOT NULL,
    "note" DOUBLE PRECISION NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "UserEvaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MediaToUserEvaluation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MediaToUserEvaluation_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MediaToUserEvaluation_B_index" ON "_MediaToUserEvaluation"("B");

-- AddForeignKey
ALTER TABLE "UserEvaluation" ADD CONSTRAINT "UserEvaluation_evaluation_id_fkey" FOREIGN KEY ("evaluation_id") REFERENCES "Evaluation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEvaluation" ADD CONSTRAINT "UserEvaluation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaToUserEvaluation" ADD CONSTRAINT "_MediaToUserEvaluation_A_fkey" FOREIGN KEY ("A") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaToUserEvaluation" ADD CONSTRAINT "_MediaToUserEvaluation_B_fkey" FOREIGN KEY ("B") REFERENCES "UserEvaluation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
