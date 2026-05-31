import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('donations')
export class Donation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  donorId: string;

  @Column()
  recipientId: string; // User or Church

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ default: 'BRL' })
  currency: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'pending' })
  status: string; // pending, completed, failed

  @Column({ nullable: true })
  paymentMethod: string; // credit_card, pix, boleto, paypal, etc

  @Column({ nullable: true })
  transactionId: string;

  @Column({ default: 0.7 })
  recipientPercentage: number; // 70% to recipient, 30% to app

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
