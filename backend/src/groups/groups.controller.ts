import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createGroupDto: any) {
    return this.groupsService.create(createGroupDto);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.groupsService.findById(id);
  }

  @Get('church/:churchId')
  async getByChurchId(@Param('churchId') churchId: string) {
    return this.groupsService.findByChurchId(churchId);
  }

  @Post(':id/members/:userId')
  @UseGuards(JwtAuthGuard)
  async addMember(@Param('id') groupId: string, @Param('userId') userId: string) {
    return this.groupsService.addMember(groupId, userId);
  }
}
