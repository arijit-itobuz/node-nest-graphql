import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/signUp.input';
import { Response } from 'src/common/dto/response.output';
import { VerifyInput } from './dto/verify.input';
import { SignInInput } from './dto/signIn.input';
import { SignInOutput } from './dto/signIn.output';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  async auth(): Promise<string> {
    return 'Hello, Auth!';
  }

  @Mutation(() => Response)
  async signUp(@Args('signUpInput') signUpInput: SignUpInput): Promise<Response> {
    return await this.authService.signUp(signUpInput);
  }

  @Mutation(() => Response)
  async verifyLink(@Args('verifyLinkInput') verifyLinkInput: SignUpInput): Promise<Response> {
    return await this.authService.signUp(verifyLinkInput);
  }

  @Mutation(() => String)
  async verify(@Args('verifyInput') verifyInput: VerifyInput): Promise<Response> {
    return this.authService.verify(verifyInput);
  }

  @Mutation(() => String)
  async signIn(@Args('signInInput') signInInput: SignInInput): Promise<SignInOutput | Response> {
    return this.authService.signIn(signInInput);
  }
}
