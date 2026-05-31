import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(skip = 0, take = 20) {
    return this.usersRepository.find({
      skip,
      take,
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string) {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async update(id: string, updateData: any) {
    await this.usersRepository.update(id, updateData);
    return this.findById(id);
  }

  async delete(id: string) {
    return this.usersRepository.delete(id);
  }

  async getFakeUsers() {
    return this.usersRepository.find({
      where: { isFake: true },
    });
  }

  async getRealUsers() {
    return this.usersRepository.find({
      where: { isFake: false },
    });
  }
}
