import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, User } from '@prisma/client';
import { GraphQLError } from 'graphql';
import { Exception } from 'src/common/error/exception';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const roles = this.reflector.get<Role[]>('roles', context.getHandler());

      if (!roles?.length) {
        throw new GraphQLError('Forbidden role type');
      }

      const user: User = context.getArgByIndex(2).req.user;

      if (user && roles.includes(user.role)) {
        return true;
      }

      throw new GraphQLError('Forbidden role type');
    } catch (error) {
      Exception(error, 'RolesGuard error');
    }
  }
}
