import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Church } from './church.entity';

@Injectable()
export class ChurchesService {
  constructor(
    @InjectRepository(Church)
    private churchesRepository: Repository<Church>,
  ) {}

  async create(createChurchDto: any) {
    const church = this.churchesRepository.create(createChurchDto);
    return this.churchesRepository.save(church);
  }

  async findAll(skip = 0, take = 20) {
    return this.churchesRepository.find({
      skip,
      take,
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string) {
    return this.churchesRepository.findOne({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.churchesRepository.findOne({
      where: { email },
    });
  }

  async update(id: string, updateData: any) {
    await this.churchesRepository.update(id, updateData);
    return this.findById(id);
  }

  async delete(id: string) {
    return this.churchesRepository.update(id, { isActive: false });
  }

  async getVerified() {
    return this.churchesRepository.find({
      where: { isVerified: true, isActive: true },
    });
  }
}
