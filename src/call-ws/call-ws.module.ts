import { Module } from '@nestjs/common';
import { CallWsGateway } from './call-ws.gateway';

@Module({
  providers: [CallWsGateway],
})
export class CallWsModule {}
