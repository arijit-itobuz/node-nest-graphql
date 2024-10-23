import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrivilegeType, Role } from '@prisma/client';
import { GraphQLError } from 'graphql';

import { IUserWithPrivileges } from '../../common/interface/userWithPrivileges.interface';
import { Exception } from '../../common/error/exception';

@Injectable()
export class PrivilegesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const privileges = this.reflector.get<PrivilegeType[]>('privileges', context.getHandler());

      if (!privileges?.length) {
        throw new GraphQLError('Forbidden privileges');
      }

      const user: IUserWithPrivileges = context.getArgByIndex(2).req.user;

      if (user.role === Role.SUPER_ADMIN) {
        return true;
      }

      const privilegesPresent = privileges.every((p) => user.privileges.map((e) => e.name).includes(p));

      if (privilegesPresent) {
        return true;
      }

      throw new GraphQLError('Forbidden privileges');
    } catch (error) {
      Exception(error, 'PrivilegesGuard error');
    }
  }
}
