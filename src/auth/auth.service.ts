import { Injectable } from '@nestjs/common';
import { SignUpInput } from './dto/signUp.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { GraphQLError } from 'graphql';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { Response } from 'src/common/dto/response.output';
import { config } from 'src/configs/config';
import { MailService } from 'src/mail/mail.service';
import { TokenType } from '@prisma/client';
import { VerifyInput } from './dto/verify.input';
import { VerifyLinkInput } from './dto/verifyLink.input';
import { SignInInput } from './dto/signIn.input';
import { SignInOutput } from './dto/signIn.output';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  async signUp(signUpInput: SignUpInput): Promise<Response> {
    const user = await this.prisma.user.findFirst({
      where: { email: signUpInput.email },
    });

    if (user) {
      throw new GraphQLError('Email already in use');
    }

    try {
      const verifyToken = this.jwtService.sign(
        { email: signUpInput.email },
        { expiresIn: '10m', secret: config.jwt.verify_token_secret }
      );

      await this.mailService.send_email('User Verification Link', `token: ${verifyToken}`, signUpInput.email);

      await this.prisma.token.create({
        data: {
          token: verifyToken,
          tokenType: TokenType.SIGNUP_VERIFY_TOKEN,
        },
      });

      const passwordHash = await bcryptjs.hash(signUpInput.password, 10);

      await this.prisma.user.create({
        data: {
          firstName: signUpInput.firstName,
          lastName: signUpInput.lastName,
          email: signUpInput.email,
          dob: signUpInput.dob,
          phoneNumber: signUpInput.phoneNumber,
          passwordHash: passwordHash,
        },
      });

      return { message: 'SignUp success, proceed to verification' };
    } catch {
      throw new GraphQLError('SignUp failed');
    }
  }

  async verifyLink(verifyLinkInput: VerifyLinkInput): Promise<Response> {
    const user = await this.prisma.user.findFirst({
      where: { email: verifyLinkInput.email },
    });

    if (!user) {
      throw new GraphQLError('Invalid User');
    }

    const passwordCompare = await bcryptjs.compare(verifyLinkInput.password, user.passwordHash);

    if (!passwordCompare) {
      throw new GraphQLError('Invalid Credentials');
    }

    try {
      const verifyToken = this.jwtService.sign(
        { email: verifyLinkInput.email },
        { expiresIn: '10m', secret: config.jwt.verify_token_secret }
      );

      await this.mailService.send_email('User Verification Link', `token: ${verifyToken}`, verifyLinkInput.email);

      return { message: 'Verification link sent, proceed to verification' };
    } catch {
      throw new GraphQLError('Failed to send verification link');
    }
  }

  async verify(verifyInput: VerifyInput): Promise<Response> {
    try {
      const decoded = this.jwtService.verify(verifyInput.token, { secret: config.jwt.verify_token_secret });

      const email = decoded.email as string;

      await this.prisma.user.update({
        where: { email: email },
        data: { verified: true },
      });

      return { message: 'User verification success' };
    } catch {
      throw new GraphQLError('User verification failed');
    }
  }

  async signIn(signInInput: SignInInput): Promise<SignInOutput | Response> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email: signInInput.email },
      });

      if (!user) {
        throw new GraphQLError('Invalid User');
      }

      const passwordCompare = await bcryptjs.compare(signInInput.password, user.passwordHash);

      if (!passwordCompare) {
        throw new GraphQLError('Invalid Credentials');
      }

      if (!user.verified) {
        try {
          const verifyToken = this.jwtService.sign(
            { email: signInInput.email },
            { expiresIn: '10m', secret: config.jwt.verify_token_secret }
          );

          await this.mailService.send_email('User Verification Link', `token: ${verifyToken}`, signInInput.email);

          return { message: 'User not verified, verification link sent' };
        } catch {
          throw new GraphQLError('User not verified, failed to send verification link');
        }
      }

      const accessToken = this.jwtService.sign(
        { email: signInInput.email },
        { expiresIn: '1h', secret: config.jwt.access_token_secret }
      );
      const refreshToken = this.jwtService.sign(
        { email: signInInput.email },
        { expiresIn: '30d', secret: config.jwt.refresh_token_secret }
      );

      return { message: 'SignIn success', accessToken, refreshToken };
    } catch {
      throw new GraphQLError('SignIn failed');
    }
  }
}
