import { IsString } from 'class-validator';

export class GetInitiatedMessagesDto {
  @IsString()
  userId: string;
}

export class GetMessagesDto {
  @IsString()
  receiverId: string;

  @IsString()
  senderId: string;
}
