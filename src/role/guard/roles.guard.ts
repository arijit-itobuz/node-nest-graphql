import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { GraphQLError } from 'graphql';

import { IUserWithPrivileges } from '../../common/interface/userWithPrivileges.interface';
import { Exception } from '../../common/error/exception';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const roles = this.reflector.get<Role[]>('roles', context.getHandler());

      if (!roles?.length) {
        throw new GraphQLError('Forbidden role type');
      }

      const user: IUserWithPrivileges = context.getArgByIndex(2).req.user;

      if (user && roles.includes(user.role)) {
        return true;
      }

      throw new GraphQLError('Forbidden role type');
    } catch (error) {
      Exception(error, 'RolesGuard error');
    }
  }
}
