import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [PassportModule],
  providers: [AuthResolver, AuthService, PrismaService, JwtService, JwtStrategy, MailService],
})
export class AuthModule {}
