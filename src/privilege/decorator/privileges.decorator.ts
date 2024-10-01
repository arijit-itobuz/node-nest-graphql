import type { CustomDecorator } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import type { PrivilegeType } from '@prisma/client';

export const Privileges = (...privileges: PrivilegeType[]): CustomDecorator<string> => {
  return SetMetadata('privileges', privileges);
};
