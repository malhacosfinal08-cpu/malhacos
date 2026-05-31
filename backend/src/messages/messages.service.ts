import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async create(createMessageDto: any) {
    const message = this.messagesRepository.create(createMessageDto);
    return this.messagesRepository.save(message);
  }

  async findConversation(userId1: string, userId2: string) {
    return this.messagesRepository.find({
      where: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
      order: { createdAt: 'ASC' },
      relations: ['sender', 'receiver'],
    });
  }

  async findUserMessages(userId: string) {
    return this.messagesRepository.find({
      where: [
        { senderId: userId },
        { receiverId: userId },
      ],
      order: { createdAt: 'DESC' },
      relations: ['sender', 'receiver'],
    });
  }

  async markAsRead(messageId: string) {
    await this.messagesRepository.update(messageId, { isRead: true });
  }
}
