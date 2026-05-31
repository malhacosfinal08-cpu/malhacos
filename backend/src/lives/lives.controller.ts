import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { LivesService } from './lives.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('lives')
export class LivesController {
  constructor(private livesService: LivesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createLiveDto: any, @Request() req) {
    return this.livesService.create({
      ...createLiveDto,
      hostId: req.user.id,
    });
  }

  @Get()
  async getAll() {
    return this.livesService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.livesService.findById(id);
  }

  @Post(':id/join')
  @UseGuards(JwtAuthGuard)
  async joinLive(@Param('id') liveId: string, @Request() req) {
    return this.livesService.addViewer(liveId, req.user.id);
  }

  @Post(':id/end')
  @UseGuards(JwtAuthGuard)
  async endLive(@Param('id') id: string) {
    return this.livesService.endLive(id);
  }
}
