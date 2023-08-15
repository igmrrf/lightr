import { PartialType } from '@nestjs/mapped-types';
import { CreateUserWDto } from './create-user-w.dto';

export class UpdateUserWDto extends PartialType(CreateUserWDto) {
  id: number;
}
