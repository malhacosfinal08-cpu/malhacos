import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: any) {
    const comment = this.commentsRepository.create(createCommentDto);
    return this.commentsRepository.save(comment);
  }

  async findByPostId(postId: string) {
    return this.commentsRepository.find({
      where: { postId, isActive: true },
      order: { createdAt: 'DESC' },
      relations: ['author'],
    });
  }

  async findById(id: string) {
    return this.commentsRepository.findOne({
      where: { id },
      relations: ['author'],
    });
  }

  async delete(id: string) {
    return this.commentsRepository.update(id, { isActive: false });
  }
}
