import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

import type { IUserWithPrivileges } from '../../common/interface/userWithPrivileges.interface';

export const GetUserWithPrivilege = createParamDecorator(
  (data: unknown, context: ExecutionContext): IUserWithPrivileges => {
    return context.getArgByIndex(2).req.user as IUserWithPrivileges;
  }
);
