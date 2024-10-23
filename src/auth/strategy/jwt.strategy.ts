import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { GraphQLError } from 'graphql';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PrismaService } from '../../prisma/prisma.service';
import { config } from '../../config/config';
import { IJwtPayload } from '../../common/interface/jwtPayload.interface';
import { IUserWithPrivileges } from '../../common/interface/userWithPrivileges.interface';
import { Exception } from '../../common/error/exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwt.access_token_secret,
    });
  }

  async validate(payload: IJwtPayload): Promise<IUserWithPrivileges> {
    try {
      const email = payload.email;
      const user = await this.prisma.user.findUnique({
        where: { email },
        include: { privileges: true },
      });

      if (!user) {
        throw new GraphQLError('Forbidden user');
      }

      return user; // this goes into req.user
    } catch (error) {
      Exception(error, 'JwtStrategy validate error');
    }
  }
}
