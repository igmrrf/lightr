import { IsString } from 'class-validator';

export class TokenAuthDto {
  @IsString()
  userID: string;
}
