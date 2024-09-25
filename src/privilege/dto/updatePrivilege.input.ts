import { InputType, Field } from '@nestjs/graphql';
import { PrivilegeType } from '@prisma/client';

@InputType()
export class UpdatePrivilegeInput {
  @Field(() => [String])
  removed: PrivilegeType[];

  @Field(() => [String])
  added: PrivilegeType[];
}
