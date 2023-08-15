import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { renameSync } from 'fs';
import { UserService } from 'src/user/user.service';
import { PrismaInstanceService } from 'src/utils/prisma-instance/prisma-instance.service';
import {
  CreateAudioMessageDto,
  CreateImageMessageDto,
  CreateTextMessageDto,
  CreateVideoMessageDto,
} from './dto/create-message.dto';
import { GetInitiatedMessagesDto } from './dto/get-initiated.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(private readonly userService: UserService) {}
  async create(createMessageDto: CreateTextMessageDto) {
    const { content, senderId, receiverId } = createMessageDto;

    const prisma = PrismaInstanceService.getInstance();
    // TODO: create socket to mark the message as delivered when queried by the receiver
    const getUser = global.onlineUsers.get(receiverId);
    const message = await prisma.message.create({
      data: {
        content,
        sender: {
          connect: {
            id: senderId,
          },
        },
        receiver: {
          connect: {
            id: receiverId,
          },
        },
        status: getUser ? 'delivered' : 'sent',
      },
    });
    if (!message) {
      throw new UnprocessableEntityException('Message cannot be created');
    }
    return message;
  }

  async createAudio(createAudioMessageDto: CreateAudioMessageDto) {
    const { senderId, receiverId, content } = createAudioMessageDto;
    const date = Date.now();
    const fileName = `uploads/audios/${date}${content.originalname}`;
    renameSync(content.path, fileName);

    const prisma = PrismaInstanceService.getInstance();
    const getUser = global.onlineUsers.get(receiverId);

    const message = await prisma.message.create({
      data: {
        content: fileName,
        type: 'audio',
        sender: {
          connect: {
            id: senderId,
          },
        },
        receiver: {
          connect: {
            id: receiverId,
          },
        },
        status: getUser ? 'delivered' : 'sent',
      },
    });
    if (!message) {
      throw new UnprocessableEntityException('Message cannot be created');
    }
    return message;
  }

  async createImage(createImageMessageDto: CreateImageMessageDto) {
    const { senderId, receiverId, content } = createImageMessageDto;
    const date = Date.now();
    const fileName = `uploads/images/${date}${content.originalname}`;
    renameSync(content.path, fileName);

    const prisma = PrismaInstanceService.getInstance();
    const getUser = global.onlineUsers.get(receiverId);

    const message = await prisma.message.create({
      data: {
        content: fileName,
        type: 'image',
        sender: {
          connect: {
            id: senderId,
          },
        },
        receiver: {
          connect: {
            id: receiverId,
          },
        },
        status: getUser ? 'delivered' : 'sent',
      },
    });
    if (!message) {
      throw new UnprocessableEntityException('Message cannot be created');
    }
    return message;
  }

  async createVideo(createVideoMessageDto: CreateVideoMessageDto) {
    const { senderId, receiverId, content } = createVideoMessageDto;
    const date = Date.now();
    const fileName = `uploads/videos/${date}${content.originalname}`;
    renameSync(content.path, fileName);

    const prisma = PrismaInstanceService.getInstance();
    const getUser = global.onlineUsers.get(receiverId);

    const message = await prisma.message.create({
      data: {
        content: fileName,
        type: 'video',
        sender: {
          connect: {
            id: senderId,
          },
        },
        receiver: {
          connect: {
            id: receiverId,
          },
        },
        status: getUser ? 'delivered' : 'sent',
      },
    });
    if (!message) {
      throw new UnprocessableEntityException('Message cannot be created');
    }
    return message;
  }

  async findAll(findAllDto: { receiverId: string; senderId: string }) {
    // TODO: the userID should be gotten from express
    const { receiverId, senderId } = findAllDto;
    const prisma = PrismaInstanceService.getInstance();
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            AND: [{ senderId }, { receiverId }],
          },
          {
            AND: [{ senderId: receiverId }, { receiverId: senderId }],
          },
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const unreadMessages = [];

    if (messages.length > 0) {
      messages.forEach((message, index: number) => {
        if (message.status !== 'read' && message.senderId === receiverId) {
          messages[index].status = 'read';
          unreadMessages.push(message);
        }
      });

      await prisma.message.updateMany({
        where: {
          id: {
            in: unreadMessages.map((message) => message.id),
          },
        },
        data: {
          status: 'read',
        },
      });
    }
    return messages;
  }

  async update(updateMessageDto: UpdateMessageDto) {
    const { newContent, id } = updateMessageDto;
    const prisma = PrismaInstanceService.getInstance();

    // TODO: only sender can edit messages
    const updatedMessage = await prisma.message.update({
      where: {
        id,
      },
      data: {
        content: newContent,
      },
    });

    if (!updatedMessage) {
      throw new UnprocessableEntityException('Message cannot be updated');
    }

    return updatedMessage;
  }

  async remove(id: string) {
    const prisma = PrismaInstanceService.getInstance();
    // TODO: get the user ID
    const deletedMessage = await prisma.message.update({
      where: {
        id,
      },
      data: {
        deleted: true,
        deletedByReceiver: true,
      },
    });

    if (!deletedMessage) {
      throw new UnprocessableEntityException('Message cannot be deleted');
    }
    return deletedMessage;
  }

  async getInitiatedMessages(getInitiatedMessagesDto: GetInitiatedMessagesDto) {
    const { userId } = getInitiatedMessagesDto;
    const prisma: PrismaClient = PrismaInstanceService.getInstance();
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        sentMessages: {
          include: {
            receiver: true,
            sender: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        receivedMessages: {
          include: {
            receiver: true,
            sender: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
    const messages = [...user.sentMessages, ...user.receivedMessages];
    messages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    const users = new Map();
    const messageStatusChange = [];

    messages.forEach((message) => {
      const isSender = message.senderId === userId;
      const calculatedId = isSender ? message.receiverId : message.senderId;
      if (message.status === 'sent') {
        messageStatusChange.push(message.id);
      }

      const {
        id,
        type,
        content: msg,
        status,
        createdAt,
        senderId,
        receiverId,
      } = message;

      if (!users.has(calculatedId)) {
        let user = {
          messageId: id,
          type,
          message: msg,
          status,
          createdAt,
          senderId,
          receiverId,
          totalUnreadMessages: 0,
        };
        if (isSender) {
          user = {
            ...user,
            ...message.receiver,
          };
        } else {
          user = {
            ...user,
            ...message.sender,
            totalUnreadMessages: status !== 'read' ? 1 : 0,
          };
        }
        users.set(calculatedId, user);
      } else if (status !== 'read' && !isSender) {
        const user = users.get(calculatedId);
        users.set(calculatedId, {
          ...user,
          totalUnreadMessages: user.totalUnreadMessages + 1,
        });
      }
    });

    if (messageStatusChange.length > 0) {
      await prisma.message.updateMany({
        where: {
          id: {
            in: messageStatusChange,
          },
        },
        data: {
          status: 'delivered',
        },
      });
    }
    return {
      users: Array.from(users.values()),
      onlineUsers: Array.from(global.onlineUsers.keys()),
    };
  }
}
