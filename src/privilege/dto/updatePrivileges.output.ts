import { Field, ObjectType } from '@nestjs/graphql';

import { AppResponse } from '../../common/dto/response.output';

@ObjectType()
export class UpdatePrivilegesOutput extends AppResponse {
  @Field(() => String)
  email: string;

  @Field(() => [String])
  privileges: string[];
}
