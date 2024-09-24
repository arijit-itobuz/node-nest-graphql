import { SetMetadata } from '@nestjs/common';
import { PrivilegeType } from '@prisma/client';

export const Privileges = (...privileges: PrivilegeType[]) => {
  return SetMetadata('privileges', privileges);
};
