import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { AppResponse } from '../../common/dto/response.output';

@ObjectType()
export class RefreshTokenOutput extends AppResponse {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  refreshToken: string;
}
