import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Live } from './live.entity';

@Injectable()
export class LivesService {
  constructor(
    @InjectRepository(Live)
    private livesRepository: Repository<Live>,
  ) {}

  async create(createLiveDto: any) {
    const live = this.livesRepository.create(createLiveDto);
    return this.livesRepository.save(live);
  }

  async findAll() {
    return this.livesRepository.find({
      where: { status: 'live' },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string) {
    return this.livesRepository.findOne({
      where: { id },
    });
  }

  async addViewer(liveId: string, userId: string) {
    const live = await this.findById(liveId);
    if (!live.viewerIds.includes(userId)) {
      live.viewerIds.push(userId);
      live.viewersCount += 1;
    }
    return this.livesRepository.save(live);
  }

  async endLive(id: string) {
    await this.livesRepository.update(id, {
      status: 'ended',
      endedAt: new Date(),
    });
    return this.findById(id);
  }

  async update(id: string, updateData: any) {
    await this.livesRepository.update(id, updateData);
    return this.findById(id);
  }
}
