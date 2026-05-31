import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
  ) {}

  async create(createGroupDto: any) {
    const group = this.groupsRepository.create(createGroupDto);
    return this.groupsRepository.save(group);
  }

  async findById(id: string) {
    return this.groupsRepository.findOne({
      where: { id },
    });
  }

  async findByChurchId(churchId: string) {
    return this.groupsRepository.find({
      where: { churchId, isActive: true },
    });
  }

  async addMember(groupId: string, userId: string) {
    const group = await this.findById(groupId);
    if (!group.memberIds.includes(userId)) {
      group.memberIds.push(userId);
    }
    return this.groupsRepository.save(group);
  }

  async removeMember(groupId: string, userId: string) {
    const group = await this.findById(groupId);
    group.memberIds = group.memberIds.filter((id) => id !== userId);
    return this.groupsRepository.save(group);
  }

  async update(id: string, updateData: any) {
    await this.groupsRepository.update(id, updateData);
    return this.findById(id);
  }
}
