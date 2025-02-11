-- CreateEnum
CREATE TYPE "UserRoleStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "UserRole" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';
