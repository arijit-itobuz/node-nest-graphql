import { PrismaClient } from '@prisma/client';
import { privilegeSeed } from './seed/01_privilege.seed';
import { superAdminSeed } from './seed/02_superAdmin.seed';
import { adminSeed } from './seed/03_admin.seed';
import { userSeed } from './seed/04_user.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding: start');

  await privilegeSeed(prisma);
  await superAdminSeed(prisma);
  await adminSeed(prisma);
  await userSeed(prisma);

  console.log('Seeding: end, ignore the errors');
}

main()
  .catch((e) => {
    console.error('seed error', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
