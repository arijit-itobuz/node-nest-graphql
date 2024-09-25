import { PrismaClient, PrivilegeType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('seeding data');
  await prisma.privilege.createMany({
    data: [
      { name: PrivilegeType.PROFILE_READ, description: 'profile read only permission' },
      { name: PrivilegeType.PROFILE_READ_WRITE, description: 'profile read and write permission' },

      { name: PrivilegeType.PRIVILEGE_READ, description: 'profile read and write permission' },
      { name: PrivilegeType.PRIVILEGE_READ_WRITE, description: 'profile read and write permission' },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error('seed error', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
