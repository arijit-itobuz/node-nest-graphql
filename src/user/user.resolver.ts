import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PrivilegeType, Role } from '@prisma/client';

import { Roles } from 'src/role/decorator/roles.decorator';
import { IUserWithPrivileges } from 'src/common/interface/userWithPrivileges.interface';
import { GetUserWithPrivilege } from 'src/auth/decorator/getUserWithPrivilege.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/role/guard/roles.guard';
import { PrivilegesGuard } from 'src/privilege/guard/privileges.guard';
import { Privileges } from 'src/privilege/decorator/privileges.decorator';

import { UserService } from './user.service';
import { GetProfileOutput } from './dto/getProfile.output';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => GetProfileOutput)
  @UseGuards(JwtGuard, RolesGuard, PrivilegesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.USER)
  @Privileges(PrivilegeType.PROFILE_READ)
  async getProfile(@GetUserWithPrivilege() user: IUserWithPrivileges): Promise<GetProfileOutput> {
    return this.userService.getProfile(user);
  }
}
