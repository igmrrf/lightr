import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(4001)
export class CallWsGateway {
  @WebSocketServer()
  socket: Server;

  @SubscribeMessage('out-going-video-call')
  outGoingVideoCall(@MessageBody() data: any) {
    const sendUserSocket = global.onlineUsers.get(data.receiver);
    console.log({ sendUserSocket });
    if (sendUserSocket) {
      this.socket.to(sendUserSocket).emit('incoming-video-call', {
        from: data.sender,
        roomId: data.roomId,
        callType: data.callType,
      });
    }
  }

  @SubscribeMessage('out-going-voice-call')
  outGoingVoiceCall(@MessageBody() data: any) {
    console.log({ socket: this.socket });
    const sendUserSocket = global.onlineUsers.get(data.receiver);
    if (sendUserSocket) {
      this.socket.to(sendUserSocket).emit('incoming-voice-call', {
        from: data.sender,
        roomId: data.roomId,
        callType: data.callType,
      });
    }
  }

  @SubscribeMessage('accept-incoming-video-call')
  acceptIncomingVideoCall(@MessageBody() data: any) {
    const sendUserSocket = global.onlineUsers.get(data.receiver);
    if (sendUserSocket) {
      this.socket.to(sendUserSocket).emit('video-call-accepted', {
        from: data.sender,
        roomId: data.roomId,
        callType: data.callType,
      });
    }
  }

  @SubscribeMessage('accept-incoming-voice-call')
  acceptIncomingVoiceCall(@MessageBody() data: any) {
    const sendUserSocket = global.onlineUsers.get(data.receiver);
    if (sendUserSocket) {
      this.socket.to(sendUserSocket).emit('voice-call-accepted', {
        from: data.sender,
        roomId: data.roomId,
        callType: data.callType,
      });
    }
  }

  @SubscribeMessage('reject-incoming-video-call')
  rejectIncomingVideoCall(@MessageBody() data: any) {
    const sendUserSocket = global.onlineUsers.get(data.receiver);
    if (sendUserSocket) {
      this.socket.to(sendUserSocket).emit('video-call-rejected', {
        from: data.sender,
        roomId: data.roomId,
        callType: data.callType,
      });
    }
  }

  @SubscribeMessage('reject-incoming-voice-call')
  rejectIncomingVoiceCall(@MessageBody() data: any) {
    const sendUserSocket = global.onlineUsers.get(data.receiver);
    if (sendUserSocket) {
      this.socket.to(sendUserSocket).emit('voice-call-rejected', {
        from: data.sender,
        roomId: data.roomId,
        callType: data.callType,
      });
    }
  }
}
