import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class SignUpInput {
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @Field(() => String)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @Field(() => String)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @Field(() => String)
  dob: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Field(() => String)
  password: string;
}
