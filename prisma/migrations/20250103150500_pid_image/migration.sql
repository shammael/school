-- AlterTable
ALTER TABLE "Pid" ADD COLUMN     "image_id" TEXT;

-- AddForeignKey
ALTER TABLE "Pid" ADD CONSTRAINT "Pid_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
