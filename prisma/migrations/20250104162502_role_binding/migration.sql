/*
  Warnings:

  - You are about to drop the column `student_id` on the `StudentEvaluation` table. All the data in the column will be lost.
  - You are about to drop the column `role_bindings` on the `UserRole` table. All the data in the column will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClassroomToStudent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClassroomToTeacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EvaluationToMedia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProgramToStudent` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `StudentEvaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `school_id` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actions` to the `UserRole` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_school_id_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_user_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentEvaluation" DROP CONSTRAINT "StudentEvaluation_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_school_id_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_user_id_fkey";

-- DropForeignKey
ALTER TABLE "_ClassroomToStudent" DROP CONSTRAINT "_ClassroomToStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassroomToStudent" DROP CONSTRAINT "_ClassroomToStudent_B_fkey";

-- DropForeignKey
ALTER TABLE "_ClassroomToTeacher" DROP CONSTRAINT "_ClassroomToTeacher_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassroomToTeacher" DROP CONSTRAINT "_ClassroomToTeacher_B_fkey";

-- DropForeignKey
ALTER TABLE "_EvaluationToMedia" DROP CONSTRAINT "_EvaluationToMedia_A_fkey";

-- DropForeignKey
ALTER TABLE "_EvaluationToMedia" DROP CONSTRAINT "_EvaluationToMedia_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProgramToStudent" DROP CONSTRAINT "_ProgramToStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProgramToStudent" DROP CONSTRAINT "_ProgramToStudent_B_fkey";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StudentEvaluation" DROP COLUMN "student_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "school_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserRole" DROP COLUMN "role_bindings",
ADD COLUMN     "actions" JSONB NOT NULL;

-- DropTable
DROP TABLE "Student";

-- DropTable
DROP TABLE "Teacher";

-- DropTable
DROP TABLE "_ClassroomToStudent";

-- DropTable
DROP TABLE "_ClassroomToTeacher";

-- DropTable
DROP TABLE "_EvaluationToMedia";

-- DropTable
DROP TABLE "_ProgramToStudent";

-- CreateTable
CREATE TABLE "_MediaToStudentEvaluation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MediaToStudentEvaluation_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ProgramToSubject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProgramToSubject_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_branches" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_branches_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MediaToStudentEvaluation_B_index" ON "_MediaToStudentEvaluation"("B");

-- CreateIndex
CREATE INDEX "_ProgramToSubject_B_index" ON "_ProgramToSubject"("B");

-- CreateIndex
CREATE INDEX "_branches_B_index" ON "_branches"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_id_key" ON "Profile"("user_id");

-- AddForeignKey
ALTER TABLE "StudentEvaluation" ADD CONSTRAINT "StudentEvaluation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "UserRoleBinding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRoleBinding" ADD CONSTRAINT "UserRoleBinding_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "UserRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaToStudentEvaluation" ADD CONSTRAINT "_MediaToStudentEvaluation_A_fkey" FOREIGN KEY ("A") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaToStudentEvaluation" ADD CONSTRAINT "_MediaToStudentEvaluation_B_fkey" FOREIGN KEY ("B") REFERENCES "StudentEvaluation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProgramToSubject" ADD CONSTRAINT "_ProgramToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProgramToSubject" ADD CONSTRAINT "_ProgramToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_branches" ADD CONSTRAINT "_branches_A_fkey" FOREIGN KEY ("A") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_branches" ADD CONSTRAINT "_branches_B_fkey" FOREIGN KEY ("B") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;
