import { IsEmail, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  status: string;

  @IsString()
  profilePicture: string;
}
