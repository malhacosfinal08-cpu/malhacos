import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';
import { Church } from '../churches/church.entity';
import { Live } from '../lives/live.entity';
import { Donation } from '../donations/donation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Church, Live, Donation])],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
