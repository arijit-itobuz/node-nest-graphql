import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrivilegeType, Role } from '@prisma/client';
import { GraphQLError } from 'graphql';
import { Exception } from 'src/common/error/exception';
import { IUserWithPrivileges } from 'src/common/interface/userWithPrivileges.interface';

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
