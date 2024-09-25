import { InputType, Field } from '@nestjs/graphql';
import { PrivilegeType } from '@prisma/client';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdatePrivilegesInput {
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  email: string;

  @Field(() => [String])
  removed: PrivilegeType[];

  @Field(() => [String])
  added: PrivilegeType[];
}
