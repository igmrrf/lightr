import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionFilter } from './app/http-exception/http-exception.filter';
import { HttpResponseInterceptor } from './app/http-response/http-response.interceptor';
import { AuthWsModule } from './auth-ws/auth-ws.module';
import { AuthModule } from './auth/auth.module';
import { CallWsModule } from './call-ws/call-ws.module';
import config from './config';
import { MessageWsModule } from './message-ws/message-ws.module';
import { MessageModule } from './message/message.module';
import { UserWsModule } from './user-ws/user-ws.module';
import { UserModule } from './user/user.module';
import { PrismaInstanceService } from './utils/prisma-instance/prisma-instance.service';
import { ZegoTokenGeneratorService } from './utils/zego-token-generator/zego-token-generator.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [config],
      cache: true,
    }),
    AuthModule,
    MessageModule,
    UserModule,
    UserWsModule,
    MessageWsModule,
    CallWsModule,
    AuthWsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaInstanceService,
    ZegoTokenGeneratorService,
    { provide: APP_INTERCEPTOR, useClass: HttpResponseInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionFilter },
  ],
})
export class AppModule {}
