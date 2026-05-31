import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createMessageDto: any, @Request() req) {
    return this.messagesService.create({
      ...createMessageDto,
      senderId: req.user.id,
    });
  }

  @Get('conversation/:userId')
  @UseGuards(JwtAuthGuard)
  async getConversation(@Param('userId') userId: string, @Request() req) {
    return this.messagesService.findConversation(req.user.id, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserMessages(@Request() req) {
    return this.messagesService.findUserMessages(req.user.id);
  }
}
