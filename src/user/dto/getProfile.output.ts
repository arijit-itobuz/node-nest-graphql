import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { Response } from 'src/common/dto/response.output';

@ObjectType()
class Profile {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  dob: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  role: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  verified: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  active: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
  mfa: boolean;
}

@ObjectType()
export class GetProfileOutput extends Response {
  @Field(() => Profile)
  profile: Profile;
}
