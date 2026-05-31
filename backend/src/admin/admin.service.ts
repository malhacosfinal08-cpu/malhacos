import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';
import { Church } from '../churches/church.entity';
import { Live } from '../lives/live.entity';
import { Donation } from '../donations/donation.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    @InjectRepository(Church) private churchesRepository: Repository<Church>,
    @InjectRepository(Live) private livesRepository: Repository<Live>,
    @InjectRepository(Donation) private donationsRepository: Repository<Donation>,
  ) {}

  async getDashboard() {
    const totalUsers = await this.usersRepository.count();
    const realUsers = await this.usersRepository.count({ where: { isFake: false } });
    const fakeUsers = totalUsers - realUsers;

    const totalPosts = await this.postsRepository.count();
    const totalChurches = await this.churchesRepository.count();
    const verifiedChurches = await this.churchesRepository.count({ where: { isVerified: true } });
    const activeLives = await this.livesRepository.count({ where: { status: 'live' } });

    const donations = await this.donationsRepository.find({
      where: { status: 'completed' },
    });

    const totalDonations = donations.reduce((sum, d) => sum + parseFloat(d.amount as any), 0);
    const appRevenue = totalDonations * 0.3;

    return {
      users: { total: totalUsers, real: realUsers, fake: fakeUsers },
      posts: totalPosts,
      churches: { total: totalChurches, verified: verifiedChurches },
      lives: activeLives,
      donations: { total: totalDonations, appRevenue },
    };
  }

  async blockUser(userId: string) {
    await this.usersRepository.update(userId, { isActive: false });
  }

  async unblockUser(userId: string) {
    await this.usersRepository.update(userId, { isActive: true });
  }

  async verifyChurch(churchId: string) {
    await this.churchesRepository.update(churchId, { isVerified: true });
  }

  async deletePost(postId: string) {
    await this.postsRepository.update(postId, { isActive: false });
  }

  async getReports() {
    return {
      bannedUsers: await this.usersRepository.count({ where: { isActive: false } }),
      inactiveChurches: await this.churchesRepository.count({ where: { isActive: false } }),
    };
  }
}
