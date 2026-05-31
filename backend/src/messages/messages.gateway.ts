import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessagesService } from './messages.service';

@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  },
})
export class MessagesGateway {
  private connectedUsers = new Map();

  constructor(private messagesService: MessagesService) {}

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.connectedUsers.set(userId, client.id);
      client.broadcast.emit('user-online', userId);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.connectedUsers.delete(userId);
      client.broadcast.emit('user-offline', userId);
    }
  }

  @SubscribeMessage('send-message')
  async handleMessage(
    @MessageBody() data: { receiverId: string; content: string; senderId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.messagesService.create(data);

    const receiverSocketId = this.connectedUsers.get(data.receiverId);
    if (receiverSocketId) {
      client.server.to(receiverSocketId).emit('receive-message', message);
    }

    return message;
  }

  @SubscribeMessage('typing')
  handleTyping(@MessageBody() data: { senderId: string; receiverId: string }, @ConnectedSocket() client: Socket) {
    const receiverSocketId = this.connectedUsers.get(data.receiverId);
    if (receiverSocketId) {
      client.server.to(receiverSocketId).emit('user-typing', data.senderId);
    }
  }
}
