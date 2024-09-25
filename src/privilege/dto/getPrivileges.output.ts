import { Field, ObjectType } from '@nestjs/graphql';

import { Response } from 'src/common/dto/response.output';

@ObjectType()
export class GetPrivilegesOutput extends Response {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => [String])
  privileges: string[];
}
