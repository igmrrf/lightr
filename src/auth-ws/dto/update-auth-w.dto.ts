import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthWDto } from './create-auth-w.dto';

export class UpdateAuthWDto extends PartialType(CreateAuthWDto) {
  id: number;
}
