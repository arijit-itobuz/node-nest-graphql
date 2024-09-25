import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { Response } from 'src/common/dto/response.output';

@ObjectType()
export class RefreshTokenOutput extends Response {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  refreshToken: string;
}
