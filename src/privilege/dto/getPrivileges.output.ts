import { Field, ObjectType } from '@nestjs/graphql';

import { AppResponse } from '../../common/dto/response.output';

@ObjectType()
export class GetPrivilegesOutput extends AppResponse {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => [String])
  privileges: string[];
}
