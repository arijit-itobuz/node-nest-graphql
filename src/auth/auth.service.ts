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
import { RefreshTokenInput } from './dto/refreshToken.input';
import { RefreshTokenOutput } from './dto/refreshToken.output';
import { ForgotPasswordInput } from './dto/forgetPassword.input';
import { ResetPasswordInput } from './dto/resetPassword.input';
import { Exception } from 'src/common/error/exception';
import { SignInMFAInput } from './dto/signInMFA.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  async signUp(signUpInput: SignUpInput): Promise<Response> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: signUpInput.email },
      });

      if (user) {
        throw new GraphQLError('Email already in use');
      }

      const verifyToken = this.jwtService.sign(
        { email: signUpInput.email },
        { expiresIn: '10m', secret: config.jwt.verify_token_secret }
      );

      await this.mailService.send_email('User Verification Link', `token: ${verifyToken}`, signUpInput.email);

      await this.prisma.token.create({
        data: {
          token: verifyToken,
          tokenType: TokenType.VERIFY_TOKEN,
          email: signUpInput.email,
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

      return { success: true, message: 'SignUp success, proceed to verification' };
    } catch (error) {
      Exception(error, 'SignUp failed');
    }
  }

  async verifyLink(verifyLinkInput: VerifyLinkInput): Promise<Response> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: verifyLinkInput.email },
      });

      if (!user) {
        throw new GraphQLError('Invalid User');
      }

      const passwordCompare = await bcryptjs.compare(verifyLinkInput.password, user.passwordHash);

      if (!passwordCompare) {
        throw new GraphQLError('Invalid Credentials');
      }

      const verifyToken = this.jwtService.sign(
        { email: verifyLinkInput.email },
        { expiresIn: '10m', secret: config.jwt.verify_token_secret }
      );

      await this.mailService.send_email('User Verification Link', `token: ${verifyToken}`, verifyLinkInput.email);

      await this.prisma.token.create({
        data: {
          token: verifyToken,
          tokenType: TokenType.VERIFY_TOKEN,
          email: verifyLinkInput.email,
        },
      });

      return { success: true, message: 'Verification link sent, proceed to verification' };
    } catch (error) {
      Exception(error, 'Faield to send verification mail');
    }
  }

  async verify(verifyInput: VerifyInput): Promise<Response> {
    try {
      const decoded = this.jwtService.verify(verifyInput.token, { secret: config.jwt.verify_token_secret });

      const email = decoded.email as string;

      const token = await this.prisma.token.findUnique({
        where: { email_token: { email: email, token: verifyInput.token } },
      });

      if (!token) {
        throw new GraphQLError('Token Expired');
      }

      await this.prisma.user.update({
        where: { email: email },
        data: { verified: true },
      });

      await this.prisma.token.delete({
        where: { email_token: { email: email, token: verifyInput.token } },
      });

      return { success: true, message: 'User verification success' };
    } catch (error) {
      Exception(error, 'User verification failed');
    }
  }

  async signIn(signInInput: SignInInput): Promise<SignInOutput> {
    try {
      const user = await this.prisma.user.findUnique({
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

          return {
            success: false,
            message: 'User not verified, verification link sent',
            proceedToMFA: false,
            accessToken: '',
            refreshToken: '',
          };
        } catch {
          throw new GraphQLError('User not verified, failed to send verification link');
        }
      }

      if (user.mfa) {
        const mfaCode = String(Math.floor(100000 + Math.random() * 900000));

        await this.mailService.send_email('MFA Login Code', `MFA Code: ${mfaCode}`, signInInput.email);

        await this.prisma.token.create({
          data: {
            token: mfaCode,
            tokenType: TokenType.MFA_TOKEN,
            email: signInInput.email,
          },
        });

        return {
          success: true,
          message: 'Proceed to MFA',
          proceedToMFA: true,
          accessToken: '',
          refreshToken: '',
        };
      }

      const accessToken = this.jwtService.sign(
        { email: signInInput.email },
        { expiresIn: '1h', secret: config.jwt.access_token_secret }
      );

      const refreshToken = this.jwtService.sign(
        { email: signInInput.email },
        { expiresIn: '30d', secret: config.jwt.refresh_token_secret }
      );

      return { success: true, message: 'SignIn success', proceedToMFA: false, accessToken, refreshToken };
    } catch (error) {
      Exception(error, 'SignIn failed');
    }
  }

  async signInMFA(signInMFAInput: SignInMFAInput): Promise<SignInOutput> {
    try {
      const mfaToken = await this.prisma.token.findUnique({
        where: { email_token: { email: signInMFAInput.email, token: signInMFAInput.token } },
      });

      if (!mfaToken) {
        throw new GraphQLError('Invalid MFA token');
      }

      const accessToken = this.jwtService.sign(
        { email: signInMFAInput.email },
        { expiresIn: '1h', secret: config.jwt.access_token_secret }
      );

      const refreshToken = this.jwtService.sign(
        { email: signInMFAInput.email },
        { expiresIn: '30d', secret: config.jwt.refresh_token_secret }
      );

      await this.prisma.token.delete({
        where: { email_token: { email: signInMFAInput.email, token: signInMFAInput.token } },
      });

      return { success: true, message: 'SignIn MFA success', proceedToMFA: false, accessToken, refreshToken };
    } catch (error) {
      Exception(error, 'Multifactor authenticaton failed');
    }
  }

  async refreshToken(refreshTokenInput: RefreshTokenInput): Promise<RefreshTokenOutput> {
    try {
      const decoded = this.jwtService.verify(refreshTokenInput.refreshToken, {
        secret: config.jwt.refresh_token_secret,
      });

      const email = decoded.email as string;

      const user = await this.prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        throw new GraphQLError('Invalid user');
      }

      const accessToken = this.jwtService.sign(
        { email: email },
        { expiresIn: '1h', secret: config.jwt.access_token_secret }
      );
      const refreshToken = this.jwtService.sign(
        { email: email },
        { expiresIn: '30d', secret: config.jwt.refresh_token_secret }
      );

      return { success: true, message: 'Refresh and Access tokens generated', accessToken, refreshToken };
    } catch (error) {
      Exception(error, 'Failed to generate refresh and access token');
    }
  }

  async forgotPassword(forgotPasswordInput: ForgotPasswordInput): Promise<Response> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: forgotPasswordInput.email },
      });

      if (!user) {
        throw new GraphQLError('Invalid User');
      }

      const forgetPasswordToken = this.jwtService.sign(
        { email: forgotPasswordInput.email },
        { expiresIn: '10m', secret: config.jwt.forgot_password_token_secret }
      );

      await this.mailService.send_email(
        'Forget Password Link',
        `token: ${forgetPasswordToken}`,
        forgotPasswordInput.email
      );

      await this.prisma.token.create({
        data: {
          token: forgetPasswordToken,
          tokenType: TokenType.FORGET_PASSWORD_TOKEN,
          email: forgotPasswordInput.email,
        },
      });

      return { success: true, message: 'Forgot password mail sent' };
    } catch (error) {
      Exception(error, 'Failed to sent forgot password mail');
    }
  }

  async resetPassword(resetPasswordInput: ResetPasswordInput): Promise<Response> {
    try {
      const decoded = this.jwtService.verify(resetPasswordInput.token, {
        secret: config.jwt.forgot_password_token_secret,
      });

      const email = decoded.email as string;

      const token = await this.prisma.token.findUnique({
        where: { email_token: { email: email, token: resetPasswordInput.token } },
      });

      if (!token) {
        throw new GraphQLError('Token Expired');
      }

      const user = await this.prisma.user.findFirst({ where: { email } });

      if (!user) {
        throw new GraphQLError('Invalid User');
      }

      const newPasswordHash = await bcryptjs.hash(resetPasswordInput.newPassword, 10);

      await this.prisma.user.update({
        where: { email },
        data: { passwordHash: newPasswordHash },
      });

      await this.prisma.token.delete({
        where: { email_token: { email: email, token: resetPasswordInput.token } },
      });

      return { success: true, message: 'Reset password success' };
    } catch (error) {
      Exception(error, 'Reset password failed');
    }
  }
}
