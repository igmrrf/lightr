import { PartialType } from '@nestjs/mapped-types';
import { CreateCallWDto } from './create-call-w.dto';

export class UpdateCallWDto extends PartialType(CreateCallWDto) {
  id: number;
}
