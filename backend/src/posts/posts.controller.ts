import { Controller, Get, Post, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createPostDto: any, @Request() req) {
    return this.postsService.create({
      ...createPostDto,
      authorId: req.user.id,
    });
  }

  @Get('feed')
  async getFeed(@Query('skip') skip = 0, @Query('take') take = 20, @Query('type') type = 'universal') {
    return this.postsService.findAll(skip, take, type);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.postsService.findById(id);
  }

  @Post(':id/like')
  @UseGuards(JwtAuthGuard)
  async addLike(@Param('id') id: string, @Request() req) {
    return this.postsService.addLike(id, req.user.id);
  }

  @Post(':id/unlike')
  @UseGuards(JwtAuthGuard)
  async removeLike(@Param('id') id: string, @Request() req) {
    return this.postsService.removeLike(id, req.user.id);
  }
}
