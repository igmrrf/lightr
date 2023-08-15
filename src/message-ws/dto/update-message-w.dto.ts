import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageWDto } from './create-message-w.dto';

export class UpdateMessageWDto extends PartialType(CreateMessageWDto) {
  id: number;
}
