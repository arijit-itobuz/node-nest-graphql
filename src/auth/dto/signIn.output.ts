import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

import { AppResponse } from '../../common/dto/response.output';

@ObjectType()
export class SignInOutput extends AppResponse {
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
