import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ChurchesService } from './churches.service';

@Controller('churches')
export class ChurchesController {
  constructor(private churchesService: ChurchesService) {}

  @Post()
  async create(@Body() createChurchDto: any) {
    return this.churchesService.create(createChurchDto);
  }

  @Get()
  async getAll() {
    return this.churchesService.findAll();
  }

  @Get('verified')
  async getVerified() {
    return this.churchesService.getVerified();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.churchesService.findById(id);
  }
}
