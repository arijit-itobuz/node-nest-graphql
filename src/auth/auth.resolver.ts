import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { Response } from 'src/common/dto/response.output';

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

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  async auth(): Promise<any> {
    return await this.authService.auth();
  }

  @Mutation(() => Response)
  async signUp(@Args('signUpInput') signUpInput: SignUpInput): Promise<Response> {
    return await this.authService.signUp(signUpInput);
  }

  @Mutation(() => Response)
  async verifyLink(@Args('verifyLinkInput') verifyLinkInput: VerifyLinkInput): Promise<Response> {
    return await this.authService.verifyLink(verifyLinkInput);
  }

  @Mutation(() => Response)
  async verify(@Args('verifyInput') verifyInput: VerifyInput): Promise<Response> {
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

  @Mutation(() => Response)
  async forgotPassword(@Args('forgotPasswordInput') forgotPasswordInput: ForgotPasswordInput): Promise<Response> {
    return this.authService.forgotPassword(forgotPasswordInput);
  }

  @Mutation(() => Response)
  async resetPassword(@Args('resetPasswordInput') resetPasswordInput: ResetPasswordInput): Promise<Response> {
    return this.authService.resetPassword(resetPasswordInput);
  }
}
