import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { GraphQLError } from 'graphql';
import * as httpStatus from 'http-status';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Exception } from 'src/common/error/exception';
import { config } from 'src/config/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwt.access_token_secret,
    });
  }

  async validate(payload: any) {
    try {
      const email = payload.email;
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new GraphQLError('FORBIDDEN', {
          extensions: {
            code: httpStatus.FORBIDDEN,
          },
        });
      }

      return user; // this goes into req.user
    } catch (error) {
      Exception(error, 'JwtStrategy validate failed');
    }
  }
}
