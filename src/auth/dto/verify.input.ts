import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class VerifyInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  token: string;
}
