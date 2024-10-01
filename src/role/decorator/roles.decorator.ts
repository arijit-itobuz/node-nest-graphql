import type { CustomDecorator } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import type { Role } from '@prisma/client';

export const Roles = (...roles: Role[]): CustomDecorator<string> => {
  return SetMetadata('roles', roles);
};
