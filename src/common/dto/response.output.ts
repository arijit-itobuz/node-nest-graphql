import { Field, ObjectType } from '@nestjs/graphql';

import { config } from '../../config/config';

@ObjectType()
export class AppResponse {
  @Field(() => String, { defaultValue: config.app.env })
  environment?: string;

  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string;
}
