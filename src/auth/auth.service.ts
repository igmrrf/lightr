import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaInstanceService } from 'src/utils/prisma-instance/prisma-instance.service';
import { ZegoTokenGeneratorService } from 'src/utils/zego-token-generator/zego-token-generator.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { TokenAuthDto } from './dto/token-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    // private readonly prismaInstance: PrismaInstanceService,
    // private readonly zegoGen: ZegoTokenGeneratorService,
    private readonly configService: ConfigService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    // ON BOARD
    const { email, name, status, profilePicture } = createAuthDto;
    const prisma = PrismaInstanceService.getInstance();
    const user = await prisma.user.create({
      data: {
        email,
        name,
        status,
        profilePicture,
      },
    });
    if (!user) {
      throw new UnprocessableEntityException('User cannot be created');
    }
    return user;
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { email } = loginAuthDto;
    const prisma = PrismaInstanceService.getInstance();
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async generateToken(tokenAuthDto: TokenAuthDto) {
    const appID = this.configService.get('zego.appID');
    const secretID = this.configService.get('zego.secretID');
    const { userID } = tokenAuthDto;
    const effectTime = this.configService.get('zego.effectiveTime');
    const payload = this.configService.get('zego.payload');
    const genParams = {
      appID,
      secretID,
      userID,
      effectiveTimeInSeconds: effectTime,
      payload,
    };
    const ZegoGenFunc = new ZegoTokenGeneratorService();
    const token = ZegoGenFunc.generateToken(genParams);
    return token;
  }
}
