import type { PrismaClient } from '@prisma/client';
import { PrivilegeType } from '@prisma/client';

export async function privilegeSeed(prisma: PrismaClient): Promise<void> {
  console.log('\nprivilegeSeed: start');
  await prisma.privilege.createMany({
    data: [
      { name: PrivilegeType.PROFILE_READ, description: 'Profile read permission' },
      { name: PrivilegeType.PROFILE_READ_WRITE, description: 'Profile read, write permission' },

      { name: PrivilegeType.PRIVILEGE_READ, description: 'Privilege read permission' },
      { name: PrivilegeType.PRIVILEGE_READ_WRITE, description: 'profile read, write permission' },
    ],
    skipDuplicates: true,
  });
  console.log('privilegeSeed: end\n');
}
