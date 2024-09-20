import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class ResetPasswordInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  token: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Field(() => String)
  newPassword: string;
}
