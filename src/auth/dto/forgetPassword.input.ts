import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class ForgotPasswordInput {
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  email: string;
}
