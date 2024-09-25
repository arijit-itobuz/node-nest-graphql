-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('VERIFY_TOKEN', 'FORGET_PASSWORD_TOKEN', 'MFA_TOKEN');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "PrivilegeType" AS ENUM ('PROFILE_READ', 'PROFILE_READ_WRITE', 'PRIVILEGE_READ', 'PRIVILEGE_READ_WRITE');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "mfa" BOOLEAN NOT NULL DEFAULT false,
    "failedLoginCount" INTEGER NOT NULL DEFAULT 0,
    "accountLockedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "tokenType" "TokenType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "privilege" (
    "id" TEXT NOT NULL,
    "name" "PrivilegeType" NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "privilege_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PrivilegeToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "token_email_token_key" ON "token"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "privilege_name_key" ON "privilege"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_PrivilegeToUser_AB_unique" ON "_PrivilegeToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PrivilegeToUser_B_index" ON "_PrivilegeToUser"("B");

-- AddForeignKey
ALTER TABLE "_PrivilegeToUser" ADD CONSTRAINT "_PrivilegeToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "privilege"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PrivilegeToUser" ADD CONSTRAINT "_PrivilegeToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
