import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donation } from './donation.entity';

@Injectable()
export class DonationsService {
  constructor(
    @InjectRepository(Donation)
    private donationsRepository: Repository<Donation>,
  ) {}

  async create(createDonationDto: any) {
    const donation = this.donationsRepository.create(createDonationDto);
    return this.donationsRepository.save(donation);
  }

  async findById(id: string) {
    return this.donationsRepository.findOne({
      where: { id },
    });
  }

  async findByRecipient(recipientId: string) {
    return this.donationsRepository.find({
      where: { recipientId, status: 'completed' },
      order: { createdAt: 'DESC' },
    });
  }

  async findByDonor(donorId: string) {
    return this.donationsRepository.find({
      where: { donorId },
      order: { createdAt: 'DESC' },
    });
  }

  async getTotalByRecipient(recipientId: string) {
    const result = await this.donationsRepository
      .createQueryBuilder('donation')
      .where('donation.recipientId = :recipientId', { recipientId })
      .andWhere('donation.status = :status', { status: 'completed' })
      .select('SUM(CAST(donation.amount AS FLOAT))', 'total')
      .getRawOne();

    return parseFloat(result.total || 0);
  }

  async update(id: string, updateData: any) {
    await this.donationsRepository.update(id, updateData);
    return this.findById(id);
  }
}
