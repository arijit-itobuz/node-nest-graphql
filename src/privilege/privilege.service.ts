import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';

import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/common/error/exception';

import { UpdatePrivilegesInput } from './dto/updatePrivileges.input';
import { UpdatePrivilegesOutput } from './dto/updatePrivileges.output';
import { GetPrivilegesInput } from './dto/getPrivileges.input';
import { GetPrivilegesOutput } from './dto/getPrivileges.output';

@Injectable()
export class PrivilegeService {
  constructor(private readonly prisma: PrismaService) {}

  async getPrivileges(getPrivilegesInput: GetPrivilegesInput): Promise<GetPrivilegesOutput> {
    try {
      const response = await this.prisma.user.findUnique({
        where: { email: getPrivilegesInput.email },
        select: {
          id: true,
          email: true,
          privileges: { select: { name: true } },
        },
      });

      return {
        success: true,
        message: 'Privileges get success',
        id: response.id,
        email: response.email,
        privileges: response.privileges.map((e) => e.name),
      };
    } catch (error) {
      Exception(error, 'Failed to get privileges');
    }
  }

  async updatePrivileges(updatePrivilegesInput: UpdatePrivilegesInput): Promise<UpdatePrivilegesOutput> {
    try {
      if (!updatePrivilegesInput.added.length && !updatePrivilegesInput.removed.length) {
        throw new GraphQLError('No privileges to update');
      }

      const _connect = updatePrivilegesInput.added.map((e) => ({ name: e }));
      const _disconnect = updatePrivilegesInput.removed.map((e) => ({ name: e }));

      const response = await this.prisma.user.update({
        where: { email: updatePrivilegesInput.email },
        data: {
          privileges: {
            connect: _connect,
            disconnect: _disconnect,
          },
        },
        include: {
          privileges: {
            select: { name: true },
          },
        },
      });

      return {
        success: true,
        message: 'Privileges updated',
        email: updatePrivilegesInput.email,
        privileges: response.privileges.map((e) => e.name),
      };
    } catch (error) {
      console.log(error);
      Exception(error, 'Failed to update privileges');
    }
  }
}
