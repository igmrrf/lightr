import { Module } from '@nestjs/common';
import { PrismaInstanceService } from 'src/utils/prisma-instance/prisma-instance.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PrismaInstanceService],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
