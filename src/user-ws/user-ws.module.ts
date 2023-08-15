import { Module } from '@nestjs/common';
import { UserWsGateway } from './user-ws.gateway';

@Module({
  imports: [],
  providers: [UserWsGateway],
})
export class UserWsModule {}
