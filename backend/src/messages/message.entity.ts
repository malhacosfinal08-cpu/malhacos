import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => User, { eager: true })
  sender: User;

  @Column()
  senderId: string;

  @ManyToOne(() => User, { eager: true })
  receiver: User;

  @Column()
  receiverId: string;

  @Column({ default: false })
  isRead: boolean;

  @Column({ nullable: true })
  attachmentUrl: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
