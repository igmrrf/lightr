import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [UserModule],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
