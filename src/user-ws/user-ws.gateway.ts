import { Logger, OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(4001)
export class UserWsGateway implements OnModuleInit {
  private readonly logger = new Logger(UserWsGateway.name);
  socketId: string;

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      this.logger.log(socket.id);
      const userId = socket.handshake.query.userId;
      global.onlineUsers.set(userId, socket.id);

      this.server.emit('message', {
        message: 'New Connection',
        socketId: socket.id,
        onlineUsers: Array.from(global.onlineUsers.keys()),
      });
      this.socketId = socket.id;
    });

    this.server.on('disconnect', (reason) => {
      this.logger.log(reason);
    });
  }

  @SubscribeMessage('add-user')
  addUser(@MessageBody() userId: string) {
    global.onlineUsers.set(userId, this.socketId);
    this.server.emit('online-users', Array.from(global.onlineUsers.keys()));
  }
}
