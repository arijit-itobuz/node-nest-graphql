import { PrismaClient } from '@prisma/client';
import { privilegeSeed } from './seed/privilege.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding: start');

  await privilegeSeed(prisma);

  console.log('Seeding: end');
}

main()
  .catch((e) => {
    console.error('seed error', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
