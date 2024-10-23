import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [PassportModule],
  providers: [AuthResolver, AuthService, PrismaService, JwtService, JwtStrategy, MailService],
})
export class AuthModule {}
