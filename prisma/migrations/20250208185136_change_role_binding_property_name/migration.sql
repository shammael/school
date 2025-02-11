-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_user_id_fkey";

-- DropIndex
DROP INDEX "Profile_user_id_key";

-- RenameColumn
ALTER TABLE "Profile" RENAME COLUMN "user_id" TO "user_role_binding_id";

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_role_binding_id_key" ON "Profile"("user_role_binding_id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_role_binding_id_fkey" FOREIGN KEY ("user_role_binding_id") REFERENCES "UserRoleBinding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;