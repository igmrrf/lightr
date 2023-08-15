import { IsByteLength, IsNumber, IsString } from 'class-validator';

export class ZegoTokenGeneratorOptions {
  @IsNumber()
  appID: number;
  @IsString({ message: 'secretID must be a string' })
  @IsByteLength(32, 32, { message: 'secretID must be 32 string' })
  secretID: string;
  @IsString({ message: 'userID must be a string' })
  userID: string;
  @IsNumber()
  effectiveTimeInSeconds: number;
  payload: string;
}
