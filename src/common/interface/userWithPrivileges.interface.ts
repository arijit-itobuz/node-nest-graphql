import { PrivilegeType, User } from '@prisma/client';

export interface IUserWithPrivileges extends User {
  privileges: {
    id: string;
    name: PrivilegeType;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}
