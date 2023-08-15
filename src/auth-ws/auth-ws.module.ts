import { Module } from '@nestjs/common';
import { AuthWsService } from './auth-ws.service';
import { AuthWsGateway } from './auth-ws.gateway';

@Module({
  providers: [AuthWsGateway, AuthWsService]
})
export class AuthWsModule {}
