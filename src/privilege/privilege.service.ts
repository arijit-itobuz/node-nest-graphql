import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePrivilegesInput } from './dto/updatePrivileges.input';
import { Exception } from 'src/common/error/exception';
import { UpdatePrivilegesOutput } from './dto/updatePrivileges.output';
import { GraphQLError } from 'graphql';

@Injectable()
export class PrivilegeService {
  constructor(private readonly prisma: PrismaService) {}

  async updatePrivileges(updatePrivilegesInput: UpdatePrivilegesInput): Promise<UpdatePrivilegesOutput> {
    try {
      if (!updatePrivilegesInput.added.length && !updatePrivilegesInput.removed.length) {
        throw new GraphQLError('No privileges to update');
      }

      const _disconnect = updatePrivilegesInput.removed.map((e) => ({ name: e }));
      const _connect = updatePrivilegesInput.added.map((e) => ({ name: e }));

      const response = await this.prisma.user.update({
        where: { email: updatePrivilegesInput.email },
        data: {
          privileges: {
            disconnect: _disconnect,
            connect: _connect,
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
