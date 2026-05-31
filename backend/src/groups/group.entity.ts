import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  logo: string;

  @Column()
  churchId: string;

  @Column()
  adminId: string;

  @Column('simple-array', { default: '' })
  memberIds: string[];

  @Column('simple-array', { default: '' })
  moderatorIds: string[];

  @Column({ default: 0 })
  postsCount: number;

  @Column({ default: false })
  isPrivate: boolean;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
