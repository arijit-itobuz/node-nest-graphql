import { Field, ObjectType } from '@nestjs/graphql';
import { Response } from 'src/common/dto/response.output';

@ObjectType()
export class UpdatePrivilegeOutput extends Response {
  @Field(() => [String])
  privileges: string[];
}
