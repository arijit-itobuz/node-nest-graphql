import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePrivilegeInput } from './dto/updatePrivilege.input';
import { Exception } from 'src/common/error/exception';
import { UpdatePrivilegeOutput } from './dto/updatePrivilege.output';
import { GraphQLError } from 'graphql';
import { IUserWithPrivileges } from 'src/common/interface/userWithPrivileges.interface';

@Injectable()
export class PrivilegeService {
  constructor(private readonly prisma: PrismaService) {}

  async updatePrivilege(
    user: IUserWithPrivileges,
    updatePrivilegeInput: UpdatePrivilegeInput
  ): Promise<UpdatePrivilegeOutput> {
    try {
      if (!updatePrivilegeInput.added.length && !updatePrivilegeInput.removed.length) {
        throw new GraphQLError('No privileges to update');
      }

      const response = await this.prisma.user.update({
        where: { email: user.email },
        data: {
          privileges: {
            disconnect: updatePrivilegeInput.removed.map((e) => ({ name: e })),
            connect: updatePrivilegeInput.added.map((e) => ({ name: e })),
          },
        },
        include: {
          privileges: {
            select: { name: true },
          },
        },
      });

      return { message: 'Privileges updated', success: true, privileges: response.privileges.map((e) => e.name) };
    } catch (error) {
      Exception(error, 'Failed to update privileges');
    }
  }
}
