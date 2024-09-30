import { PrismaClient, Role } from '@prisma/client';
import bcryptjs from 'bcryptjs';

import { config } from 'src/config/config';
import { DEFAULT_PRIVILEGE } from 'src/privilege/constants/default.privilege';

export async function adminSeed(prisma: PrismaClient) {
  try {
    console.log('\nadminSeed: start');

    const seedPassword = 'Itobuz#1234';

    await prisma.user.upsert({
      where: {
        email: 'arijit+admin@itobuz.com',
      },
      create: {
        firstName: 'Arijit',
        lastName: 'Admin',
        email: 'arijit+admin@itobuz.com',
        dob: '1999-05-28',
        phoneNumber: '+91 0000000000',
        passwordHash: await bcryptjs.hash(seedPassword, config.auth.passwordHashSalt),
        active: true,
        verified: true,
        mfa: false,
        role: Role.ADMIN,
        privileges: {
          connect: DEFAULT_PRIVILEGE.ADMIN.map((e) => ({ name: e })),
        },
      },
      update: {
        firstName: 'Arijit',
        lastName: 'Admin',
        email: 'arijit+admin@itobuz.com',
        dob: '1999-05-28',
        phoneNumber: '+91 0000000000',
        passwordHash: await bcryptjs.hash(seedPassword, config.auth.passwordHashSalt),
        active: true,
        verified: true,
        mfa: false,
        role: Role.ADMIN,
        privileges: {
          connect: DEFAULT_PRIVILEGE.ADMIN.map((e) => ({ name: e })),
        },
      },
    });

    console.log('adminSeed: end\n');
  } catch (error) {
    console.log('adminSeed: error', error.message, '\n');
  }
}
