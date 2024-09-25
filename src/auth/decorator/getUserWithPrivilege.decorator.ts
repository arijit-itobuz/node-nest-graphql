import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUserWithPrivileges } from 'src/common/interface/userWithPrivileges.interface';

export const GetUserWithPrivilege = createParamDecorator(
  (data: unknown, context: ExecutionContext): IUserWithPrivileges => {
    return context.getArgByIndex(2).req.user as IUserWithPrivileges;
  }
);
