import { PrivilegeType } from '@prisma/client';

export const DEFAULT_PRIVILEGE = {
  USER: [PrivilegeType.PROFILE_READ],
  ADMIN: [PrivilegeType.PROFILE_READ, PrivilegeType.PROFILE_READ_WRITE, PrivilegeType.PRIVILEGE_READ],
  SUPER_ADMIN: [
    PrivilegeType.PROFILE_READ,
    PrivilegeType.PROFILE_READ_WRITE,

    PrivilegeType.PRIVILEGE_READ,
    PrivilegeType.PRIVILEGE_READ_WRITE,
  ],
};
