import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('lives')
export class Live {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  churchId: string;

  @Column()
  hostId: string;

  @Column()
  embedUrl: string; // YouTube, TikTok live URL

  @Column({ default: 0 })
  viewersCount: number;

  @Column('simple-array', { default: '' })
  viewerIds: string[];

  @Column({ default: 0 })
  likesCount: number;

  @Column('simple-array', { default: '' })
  likedBy: string[];

  @Column({ default: 0 })
  giftsCount: number;

  @Column({ default: 0 })
  donationsAmount: number;

  @Column({ default: 'live' })
  status: string; // live, ended, scheduled

  @Column({ nullable: true })
  startedAt: Date;

  @Column({ nullable: true })
  endedAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
