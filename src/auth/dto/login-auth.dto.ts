import { IsEmail, IsString } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  @IsEmail()
  email: string;
}
