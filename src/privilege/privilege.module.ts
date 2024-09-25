import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { PrivilegeService } from './privilege.service';
import { PrivilegeResolver } from './privilege.resolver';

@Module({
  providers: [PrivilegeResolver, PrivilegeService, PrismaService],
})
export class PrivilegeModule {}
