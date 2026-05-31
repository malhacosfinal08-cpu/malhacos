import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: any) {
    const post = this.postsRepository.create(createPostDto);
    return this.postsRepository.save(post);
  }

  async findAll(skip = 0, take = 20, feedType = 'universal') {
    return this.postsRepository.find({
      where: { feedType, isActive: true },
      skip,
      take,
      order: { createdAt: 'DESC' },
      relations: ['author', 'comments'],
    });
  }

  async findById(id: string) {
    return this.postsRepository.findOne({
      where: { id },
      relations: ['author', 'comments'],
    });
  }

  async findByAuthorId(authorId: string) {
    return this.postsRepository.find({
      where: { authorId },
      order: { createdAt: 'DESC' },
    });
  }

  async addLike(postId: string, userId: string) {
    const post = await this.findById(postId);
    if (!post.likedBy.includes(userId)) {
      post.likedBy.push(userId);
      post.likesCount += 1;
    }
    return this.postsRepository.save(post);
  }

  async removeLike(postId: string, userId: string) {
    const post = await this.findById(postId);
    post.likedBy = post.likedBy.filter((id) => id !== userId);
    post.likesCount -= 1;
    return this.postsRepository.save(post);
  }

  async incrementView(postId: string) {
    const post = await this.findById(postId);
    post.viewsCount += 1;
    return this.postsRepository.save(post);
  }

  async update(id: string, updateData: any) {
    await this.postsRepository.update(id, updateData);
    return this.findById(id);
  }

  async delete(id: string) {
    return this.postsRepository.update(id, { isActive: false });
  }
}
