import type { PrismaClient } from '@prisma/client';
import { Role } from '@prisma/client';
import bcryptjs from 'bcryptjs';

import { config } from '../../src/config/config';
import { DEFAULT_PRIVILEGE } from '../../src/privilege/constants/default.privilege';

export async function userSeed(prisma: PrismaClient): Promise<void> {
  try {
    console.log('\nuserSeed: start');

    const seedPassword = 'Itobuz#1234';

    await prisma.user.upsert({
      where: {
        email: 'arijit+user@itobuz.com',
      },
      create: {
        firstName: 'Arijit',
        lastName: 'User',
        email: 'arijit+user@itobuz.com',
        dob: '1999-05-28',
        phoneNumber: '+91 0000000000',
        passwordHash: await bcryptjs.hash(seedPassword, config.auth.passwordHashSalt),
        active: true,
        verified: true,
        mfa: false,
        role: Role.USER,
        privileges: {
          connect: DEFAULT_PRIVILEGE.USER.map((e) => ({ name: e })),
        },
      },
      update: {
        firstName: 'Arijit',
        lastName: 'User',
        email: 'arijit+user@itobuz.com',
        dob: '1999-05-28',
        phoneNumber: '+91 0000000000',
        passwordHash: await bcryptjs.hash(seedPassword, config.auth.passwordHashSalt),
        active: true,
        verified: true,
        mfa: false,
        role: Role.USER,
        privileges: {
          connect: DEFAULT_PRIVILEGE.USER.map((e) => ({ name: e })),
        },
      },
    });

    console.log('userSeed: end\n');
  } catch (error) {
    console.log('userSeed: end', error.message, '\n');
  }
}
