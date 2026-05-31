import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('donations')
export class DonationsController {
  constructor(private donationsService: DonationsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createDonationDto: any, @Request() req) {
    return this.donationsService.create({
      ...createDonationDto,
      donorId: req.user.id,
    });
  }

  @Get('recipient/:recipientId')
  async getByRecipient(@Param('recipientId') recipientId: string) {
    return this.donationsService.findByRecipient(recipientId);
  }

  @Get('total/:recipientId')
  async getTotalByRecipient(@Param('recipientId') recipientId: string) {
    const total = await this.donationsService.getTotalByRecipient(recipientId);
    return { total };
  }
}
