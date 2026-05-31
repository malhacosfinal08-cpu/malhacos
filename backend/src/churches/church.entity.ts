import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('churches')
export class Church {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  denomination: string; // Evangélica, Católica, Pentecostal, etc

  @Column({ nullable: true })
  mission: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  zipCode: string;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;

  @Column({ nullable: true })
  pastorName: string;

  @Column({ nullable: true })
  foundedYear: number;

  @Column({ default: 0 })
  membersCount: number;

  @Column('simple-array', { default: '' })
  worshipHours: string[];

  @Column({ default: 0 })
  followers: number;

  @Column({ default: 0 })
  postsCount: number;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isFake: boolean;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
