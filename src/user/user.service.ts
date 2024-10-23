import { Injectable } from '@nestjs/common';

import { GetProfileOutput } from './dto/getProfile.output';
import { IUserWithPrivileges } from '../common/interface/userWithPrivileges.interface';
import { Exception } from '../common/error/exception';

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
