import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateTextMessageDto } from './create-message.dto';

export class UpdateMessageDto extends PartialType(CreateTextMessageDto) {
  @IsString()
  newContent: string;

  @IsString()
  id;
}
