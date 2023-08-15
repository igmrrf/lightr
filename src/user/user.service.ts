import { Injectable } from '@nestjs/common';
import { PrismaInstanceService } from 'src/utils/prisma-instance/prisma-instance.service';

@Injectable()
export class UserService {
  async findAll() {
    const prisma = PrismaInstanceService.getInstance();
    const users = await prisma.user.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
        status: true,
      },
    });
    const usersGroupedByInitialLetter = {};
    users.forEach((user: any) => {
      const initialLetter = user.name[0].toUpperCase();
      if (usersGroupedByInitialLetter[initialLetter]) {
        usersGroupedByInitialLetter[initialLetter].push(user);
      } else {
        usersGroupedByInitialLetter[initialLetter] = [user];
      }
    });

    return usersGroupedByInitialLetter;
  }
}
