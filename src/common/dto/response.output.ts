import { Field, ObjectType } from '@nestjs/graphql';
import { config } from 'src/config/config';

@ObjectType()
export class Response {
  @Field(() => String, { defaultValue: config.app.env })
  environment?: string;

  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string;
}
