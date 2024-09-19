import { Field, ObjectType } from '@nestjs/graphql';
import { config } from 'src/configs/config';

@ObjectType()
export class Response {
  @Field(() => String, { defaultValue: config.app.env })
  environment?: string;

  @Field(() => String)
  message: string;
}
