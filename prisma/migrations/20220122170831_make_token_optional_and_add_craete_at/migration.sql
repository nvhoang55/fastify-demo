-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "token" DROP NOT NULL;
