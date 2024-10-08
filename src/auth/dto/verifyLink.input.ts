import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class VerifyLinkInput {
  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  password: string;
}
