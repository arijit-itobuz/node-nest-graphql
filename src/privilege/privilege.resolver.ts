import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PrivilegeService } from './privilege.service';
import { UpdatePrivilegeOutput } from './dto/updatePrivilege.output';
import { UpdatePrivilegeInput } from './dto/updatePrivilege.input';
import { GetUserWithPrivilege } from 'src/auth/decorator/getUserWithPrivilege.decorator';
import { IUserWithPrivileges } from 'src/common/interface/userWithPrivileges.interface';
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

  @Mutation(() => UpdatePrivilegeOutput)
  @UseGuards(JwtGuard, RolesGuard, PrivilegesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Privileges(PrivilegeType.PROFILE_READ_WRITE)
  async updatePrivilege(
    @GetUserWithPrivilege() user: IUserWithPrivileges,
    @Args('updatePrivilegeInput') updatePrivilegeInput: UpdatePrivilegeInput
  ): Promise<UpdatePrivilegeOutput> {
    return await this.privilegeService.updatePrivilege(user, updatePrivilegeInput);
  }
}
