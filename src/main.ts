import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}));

  const port = configService.get('PORT');
  app.setGlobalPrefix('api', { exclude: [''] });
  await app.listen(port);
}
bootstrap();
