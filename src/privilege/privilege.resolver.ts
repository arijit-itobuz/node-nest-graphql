import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PrivilegeService } from './privilege.service';
import { UpdatePrivilegesOutput } from './dto/updatePrivileges.output';
import { UpdatePrivilegesInput } from './dto/updatePrivileges.input';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/role/guard/roles.guard';
import { PrivilegesGuard } from 'src/privilege/guard/privileges.guard';
import { Roles } from 'src/role/decorator/roles.decorator';
import { PrivilegeType, Role } from '@prisma/client';
import { Privileges } from 'src/privilege/decorator/privileges.decorator';

@Resolver()
export class PrivilegeResolver {
  constructor(private readonly privilegeService: PrivilegeService) {}

  @Mutation(() => UpdatePrivilegesOutput)
  @UseGuards(JwtGuard, RolesGuard, PrivilegesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Privileges(PrivilegeType.PRIVILEGE_READ_WRITE)
  async updatePrivileges(
    @Args('updatePrivilegeInput') updatePrivilegeInput: UpdatePrivilegesInput
  ): Promise<UpdatePrivilegesOutput> {
    return await this.privilegeService.updatePrivileges(updatePrivilegeInput);
  }
}
