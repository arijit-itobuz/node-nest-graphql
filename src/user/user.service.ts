import { Injectable } from '@nestjs/common';

import { Exception } from 'src/common/error/exception';
import { IUserWithPrivileges } from 'src/common/interface/userWithPrivileges.interface';

import { GetProfileOutput } from './dto/getProfile.output';

@Injectable()
export class UserService {
  async getProfile(user: IUserWithPrivileges): Promise<GetProfileOutput> {
    try {
      return { success: true, message: 'Get profile success', profile: { ...user } };
    } catch (error) {
      Exception(error, 'Get profile failed');
    }
  }
}
