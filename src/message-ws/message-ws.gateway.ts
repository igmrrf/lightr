import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(4001)
export class MessageWsGateway {
  @WebSocketServer()
  socket: Server;

  @SubscribeMessage('send-message')
  sendMessage(@MessageBody() message) {
    const sendUserSocket = global.onlineUsers.get(message.to);
    if (sendUserSocket) {
      this.socket.to(sendUserSocket).emit('message-receive', {
        sender: message.from,
        message: message.content,
      });
    }
  }
}
