import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './configs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(config.app.port);

  console.log(`[graphql]: http://localhost:${config.app.port}/graphql`);
  console.log(`[rest   ]: http://localhost:${config.app.port}`);
}
bootstrap();
