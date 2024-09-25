import { Field, ObjectType } from '@nestjs/graphql';
import { Response } from 'src/common/dto/response.output';

@ObjectType()
export class UpdatePrivilegesOutput extends Response {
  @Field(() => String)
  email: string;

  @Field(() => [String])
  privileges: string[];
}
