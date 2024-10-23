import { Controller, Get } from '@nestjs/common';

import { AppResponse } from './common/dto/response.output';

@Controller('/')
export class AppController {
  @Get('/')
  async base(): Promise<AppResponse> {
    return { success: true, message: 'base' };
  }

  @Get('/health')
  async health(): Promise<AppResponse> {
    return { success: true, message: 'health' };
  }
}
