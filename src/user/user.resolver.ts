import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PrivilegeType, Role } from '@prisma/client';

import { Roles } from '../role/decorator/roles.decorator';
import { IUserWithPrivileges } from '../common/interface/userWithPrivileges.interface';
import { GetUserWithPrivilege } from '../auth/decorator/getUserWithPrivilege.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { RolesGuard } from '../role/guard/roles.guard';
import { PrivilegesGuard } from '../privilege/guard/privileges.guard';
import { Privileges } from '../privilege/decorator/privileges.decorator';
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
