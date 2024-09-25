import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class GetPrivilegesInput {
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  email: string;
}
