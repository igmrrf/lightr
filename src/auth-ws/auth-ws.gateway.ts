import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(4001)
export class AuthWsGateway {
  @WebSocketServer()
  socket: Server;

  @SubscribeMessage('logout')
  logout(@MessageBody() userId: string) {
    global.onlineUsers.delete(userId);
    return this.socket.emit(
      'online-users',
      Array.from(global.onlineUsers.keys()),
    );
  }
}
