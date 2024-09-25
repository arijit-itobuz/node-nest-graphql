import { Module } from '@nestjs/common';
import { PrivilegeService } from './privilege.service';
import { PrivilegeResolver } from './privilege.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PrivilegeResolver, PrivilegeService, PrismaService],
})
export class PrivilegeModule {}
