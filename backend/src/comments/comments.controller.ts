import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createCommentDto: any, @Request() req) {
    return this.commentsService.create({
      ...createCommentDto,
      authorId: req.user.id,
    });
  }

  @Get('post/:postId')
  async getByPostId(@Param('postId') postId: string) {
    return this.commentsService.findByPostId(postId);
  }
}
