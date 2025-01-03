-- CreateEnum
CREATE TYPE "ClassroomStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "DepartmentStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "ProgramStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "SchoolStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "SchoolType" AS ENUM ('UNIVERSITY', 'HIGH_SCHOOL', 'ELEMENTARY');

-- CreateTable
CREATE TABLE "Classroom" (
    "id" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "status" "ClassroomStatus" NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CountryState" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CountryState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "status" "DepartmentStatus" NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evaluation" (
    "id" TEXT NOT NULL,
    "classroom_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "max_note" DOUBLE PRECISION NOT NULL,
    "program_id" TEXT NOT NULL,

    CONSTRAINT "Evaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentEvaluation" (
    "id" TEXT NOT NULL,
    "evaluation_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "note" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "StudentEvaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "municipality_id" TEXT NOT NULL,
    "country_state_id" TEXT NOT NULL,
    "region_id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Municipality" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "country_state_id" TEXT NOT NULL,
    "region_id" TEXT NOT NULL,

    CONSTRAINT "Municipality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pid" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Pid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "image_id" TEXT,
    "password" TEXT NOT NULL,
    "default_password" BOOLEAN NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "status" "ProgramStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "SchoolType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" "SchoolStatus" NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "school_pid" TEXT NOT NULL,
    "profile_id" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "profile_id" TEXT,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role_bindings" JSONB NOT NULL,
    "school_id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRoleBinding" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "UserRoleBinding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClassroomToTeacher" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ClassroomToTeacher_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ClassroomToStudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ClassroomToStudent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ClassroomToSubject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ClassroomToSubject_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_EvaluationToMedia" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EvaluationToMedia_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ProgramToStudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProgramToStudent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_UserToUserRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserToUserRole_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_school_id_key" ON "Location"("school_id");

-- CreateIndex
CREATE UNIQUE INDEX "Pid_number_key" ON "Pid"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Pid_user_id_key" ON "Pid"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Student_school_pid_key" ON "Student"("school_pid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "_ClassroomToTeacher_B_index" ON "_ClassroomToTeacher"("B");

-- CreateIndex
CREATE INDEX "_ClassroomToStudent_B_index" ON "_ClassroomToStudent"("B");

-- CreateIndex
CREATE INDEX "_ClassroomToSubject_B_index" ON "_ClassroomToSubject"("B");

-- CreateIndex
CREATE INDEX "_EvaluationToMedia_B_index" ON "_EvaluationToMedia"("B");

-- CreateIndex
CREATE INDEX "_ProgramToStudent_B_index" ON "_ProgramToStudent"("B");

-- CreateIndex
CREATE INDEX "_UserToUserRole_B_index" ON "_UserToUserRole"("B");

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentEvaluation" ADD CONSTRAINT "StudentEvaluation_evaluation_id_fkey" FOREIGN KEY ("evaluation_id") REFERENCES "Evaluation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentEvaluation" ADD CONSTRAINT "StudentEvaluation_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_municipality_id_fkey" FOREIGN KEY ("municipality_id") REFERENCES "Municipality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_country_state_id_fkey" FOREIGN KEY ("country_state_id") REFERENCES "CountryState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Municipality" ADD CONSTRAINT "Municipality_country_state_id_fkey" FOREIGN KEY ("country_state_id") REFERENCES "CountryState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Municipality" ADD CONSTRAINT "Municipality_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pid" ADD CONSTRAINT "Pid_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRoleBinding" ADD CONSTRAINT "UserRoleBinding_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassroomToTeacher" ADD CONSTRAINT "_ClassroomToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "Classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassroomToTeacher" ADD CONSTRAINT "_ClassroomToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassroomToStudent" ADD CONSTRAINT "_ClassroomToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassroomToStudent" ADD CONSTRAINT "_ClassroomToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassroomToSubject" ADD CONSTRAINT "_ClassroomToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassroomToSubject" ADD CONSTRAINT "_ClassroomToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EvaluationToMedia" ADD CONSTRAINT "_EvaluationToMedia_A_fkey" FOREIGN KEY ("A") REFERENCES "Evaluation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EvaluationToMedia" ADD CONSTRAINT "_EvaluationToMedia_B_fkey" FOREIGN KEY ("B") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProgramToStudent" ADD CONSTRAINT "_ProgramToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProgramToStudent" ADD CONSTRAINT "_ProgramToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToUserRole" ADD CONSTRAINT "_UserToUserRole_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToUserRole" ADD CONSTRAINT "_UserToUserRole_B_fkey" FOREIGN KEY ("B") REFERENCES "UserRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;
