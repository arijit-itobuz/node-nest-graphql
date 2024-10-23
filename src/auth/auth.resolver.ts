import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { SignUpInput } from './dto/signUp.input';
import { VerifyInput } from './dto/verify.input';
import { SignInInput } from './dto/signIn.input';
import { SignInOutput } from './dto/signIn.output';
import { RefreshTokenInput } from './dto/refreshToken.input';
import { RefreshTokenOutput } from './dto/refreshToken.output';
import { ForgotPasswordInput } from './dto/forgetPassword.input';
import { VerifyLinkInput } from './dto/verifyLink.input';
import { ResetPasswordInput } from './dto/resetPassword.input';
import { SignInMFAInput } from './dto/signInMFA.input';
import { AppResponse } from '../common/dto/response.output';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  async auth(): Promise<any> {
    return await this.authService.auth();
  }

  @Mutation(() => AppResponse)
  async signUp(@Args('signUpInput') signUpInput: SignUpInput): Promise<AppResponse> {
    return await this.authService.signUp(signUpInput);
  }

  @Mutation(() => AppResponse)
  async verifyLink(@Args('verifyLinkInput') verifyLinkInput: VerifyLinkInput): Promise<AppResponse> {
    return await this.authService.verifyLink(verifyLinkInput);
  }

  @Mutation(() => AppResponse)
  async verify(@Args('verifyInput') verifyInput: VerifyInput): Promise<AppResponse> {
    return this.authService.verify(verifyInput);
  }

  @Mutation(() => SignInOutput)
  async signIn(@Args('signInInput') signInInput: SignInInput): Promise<SignInOutput> {
    return this.authService.signIn(signInInput);
  }

  @Mutation(() => SignInOutput)
  async signInMFA(@Args('signInMFAInput') signInMFAInput: SignInMFAInput): Promise<SignInOutput> {
    return this.authService.signInMFA(signInMFAInput);
  }
  @Mutation(() => RefreshTokenOutput)
  async refreshToken(@Args('refreshTokenInput') refreshTokenInput: RefreshTokenInput): Promise<RefreshTokenOutput> {
    return this.authService.refreshToken(refreshTokenInput);
  }

  @Mutation(() => AppResponse)
  async forgotPassword(@Args('forgotPasswordInput') forgotPasswordInput: ForgotPasswordInput): Promise<AppResponse> {
    return this.authService.forgotPassword(forgotPasswordInput);
  }

  @Mutation(() => AppResponse)
  async resetPassword(@Args('resetPasswordInput') resetPasswordInput: ResetPasswordInput): Promise<AppResponse> {
    return this.authService.resetPassword(resetPasswordInput);
  }
}
