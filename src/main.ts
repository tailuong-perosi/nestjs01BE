import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { corsOptions } from './config/cors.config';
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}));

  app.enableCors(corsOptions);
  const port = configService.get('PORT');
  app.setGlobalPrefix('api', { exclude: [''] });
  await app.listen(port);
}
bootstrap();
