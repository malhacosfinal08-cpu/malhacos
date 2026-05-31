import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotService } from './bot.service';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';
import { Comment } from '../comments/comment.entity';
import { Church } from '../churches/church.entity';
import { Live } from '../lives/live.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Comment, Church, Live])],
  providers: [BotService],
  exports: [BotService],
})
export class BotModule {}
