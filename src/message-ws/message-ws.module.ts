import { Module } from '@nestjs/common';
import { MessageWsGateway } from './message-ws.gateway';

@Module({
  providers: [MessageWsGateway],
})
export class MessageWsModule {}
