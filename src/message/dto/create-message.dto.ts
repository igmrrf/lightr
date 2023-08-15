import { IsString } from 'class-validator';

export class CreateTextMessageDto {
  @IsString()
  content: string | any;

  @IsString()
  senderId: string;

  @IsString()
  receiverId: string;
}

export class CreateAudioMessageDto extends CreateTextMessageDto {
  content: {
    path: string;
    originalname: string;
    [key: string]: any;
  };
}

export class CreateImageMessageDto extends CreateTextMessageDto {
  content: {
    path: string;
    originalname: string;
    [key: string]: any;
  };
}

export class CreateVideoMessageDto extends CreateTextMessageDto {
  content: {
    path: string;
    originalname: string;
    [key: string]: any;
  };
}
