import { PrismaClient } from '@prisma/client';

export class PrismaInstanceService {
  static prismaInstance: PrismaClient;

  static getInstance(): PrismaClient {
    if (!this.prismaInstance) {
      this.prismaInstance = new PrismaClient();
    }
    return this.prismaInstance;
  }
}
