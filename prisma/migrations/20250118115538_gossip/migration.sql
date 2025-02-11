/*
  Warnings:

  - You are about to drop the column `password` on the `UserRoleBinding` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "GossipEvent" AS ENUM ('CREATE', 'UPDATE');

-- CreateEnum
CREATE TYPE "GossipModule" AS ENUM ('USER', 'CLASSROOM', 'SUBJECT', 'PROGRAM', 'EVALUATION');

-- AlterTable
ALTER TABLE "UserRoleBinding" DROP COLUMN "password";

-- CreateTable
CREATE TABLE "Gossip" (
    "id" TEXT NOT NULL,
    "activity_id" TEXT NOT NULL,
    "module" "GossipModule" NOT NULL,
    "event" "GossipEvent" NOT NULL,
    "new_data" JSONB,
    "old_data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gossip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GossipUser" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pid_id" TEXT NOT NULL,
    "pid_number" TEXT NOT NULL,
    "gossip_id" TEXT NOT NULL,

    CONSTRAINT "GossipUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GossipUser_gossip_id_key" ON "GossipUser"("gossip_id");

-- AddForeignKey
ALTER TABLE "GossipUser" ADD CONSTRAINT "GossipUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GossipUser" ADD CONSTRAINT "GossipUser_pid_id_fkey" FOREIGN KEY ("pid_id") REFERENCES "Pid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GossipUser" ADD CONSTRAINT "GossipUser_gossip_id_fkey" FOREIGN KEY ("gossip_id") REFERENCES "Gossip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
