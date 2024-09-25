import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

import { Response } from 'src/common/dto/response.output';

@ObjectType()
export class SignInOutput extends Response {
  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  proceedToMFA: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  redirectToSignIn: boolean;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  refreshToken: string;
}
