import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

global.onlineUsers = new Map();
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({ origin: '*' });
  app.useStaticAssets(join(__dirname, '..', 'uploads/images'));
  app.useStaticAssets(join(__dirname, '..', 'uploads/audios'));
  await app.listen(3000);
}
bootstrap();
