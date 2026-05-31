import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => User, { eager: true })
  author: User;

  @Column()
  authorId: string;

  @ManyToOne(() => Post)
  post: Post;

  @Column()
  postId: string;

  @Column({ default: 0 })
  likesCount: number;

  @Column('simple-array', { default: '' })
  likedBy: string[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
