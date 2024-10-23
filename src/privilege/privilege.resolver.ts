import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PrivilegeType, Role } from '@prisma/client';

import { UpdatePrivilegesInput } from './dto/updatePrivileges.input';
import { UpdatePrivilegesOutput } from './dto/updatePrivileges.output';
import { PrivilegeService } from './privilege.service';
import { GetPrivilegesInput } from './dto/getPrivileges.input';
import { GetPrivilegesOutput } from './dto/getPrivileges.output';
import { PrivilegesGuard } from './guard/privileges.guard';
import { RolesGuard } from '../role/guard/roles.guard';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { Roles } from '../role/decorator/roles.decorator';
import { Privileges } from './decorator/privileges.decorator';

@Resolver()
export class PrivilegeResolver {
  constructor(private readonly privilegeService: PrivilegeService) {}

  @Query(() => GetPrivilegesOutput)
  @UseGuards(JwtGuard, RolesGuard, PrivilegesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Privileges(PrivilegeType.PRIVILEGE_READ)
  async getPrivileges(
    @Args('getPrivilegesInput') getPrivilegesInput: GetPrivilegesInput
  ): Promise<GetPrivilegesOutput> {
    return await this.privilegeService.getPrivileges(getPrivilegesInput);
  }

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
