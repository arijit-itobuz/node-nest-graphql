import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { config } from './config/config';
// import { GlobalExceptionFilter } from './common/error/globalException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(config.app.port);

  console.log(`[graphql]: http://localhost:${config.app.port}/graphql`);
  console.log(`[rest   ]: http://localhost:${config.app.port}`);
}
bootstrap();
