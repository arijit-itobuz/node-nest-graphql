import type { PrismaClient } from '@prisma/client';
import { Role } from '@prisma/client';
import bcryptjs from 'bcryptjs';

import { config } from '../../src/config/config';
import { DEFAULT_PRIVILEGE } from '../../src/privilege/constants/default.privilege';

export async function superAdminSeed(prisma: PrismaClient): Promise<void> {
  try {
    console.log('\nsuperAdminSeed: start');

    const seedPassword = 'Itobuz#1234';

    await prisma.user.upsert({
      where: {
        email: 'arijit+super@itobuz.com',
      },
      create: {
        firstName: 'Arijit',
        lastName: 'Super',
        email: 'arijit+super@itobuz.com',
        dob: '1999-05-28',
        phoneNumber: '+91 0000000000',
        passwordHash: await bcryptjs.hash(seedPassword, config.auth.passwordHashSalt),
        active: true,
        verified: true,
        mfa: false,
        role: Role.SUPER_ADMIN,
        privileges: {
          connect: DEFAULT_PRIVILEGE.SUPER_ADMIN.map((e) => ({ name: e })),
        },
      },
      update: {
        firstName: 'Arijit',
        lastName: 'Super',
        email: 'arijit+super@itobuz.com',
        dob: '1999-05-28',
        phoneNumber: '+91 0000000000',
        passwordHash: await bcryptjs.hash(seedPassword, config.auth.passwordHashSalt),
        active: true,
        verified: true,
        mfa: false,
        role: Role.SUPER_ADMIN,
        privileges: {
          connect: DEFAULT_PRIVILEGE.SUPER_ADMIN.map((e) => ({ name: e })),
        },
      },
    });

    console.log('superAdminSeed: end\n');
  } catch (error) {
    console.log('superAdminSeed: error', error.message, '\n');
  }
}
