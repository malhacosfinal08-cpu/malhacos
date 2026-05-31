import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  videoUrl: string;

  @Column({ nullable: true })
  embedUrl: string; // YouTube, TikTok, etc

  @Column({ default: 'universal' })
  feedType: string; // universal, friends, family, group, news

  @Column({ nullable: true })
  groupId: string;

  @Column({ nullable: true })
  churchId: string;

  @ManyToOne(() => User, { eager: true })
  author: User;

  @Column()
  authorId: string;

  @OneToMany(() => Comment, (comment) => comment.post, { eager: true })
  comments: Comment[];

  @Column({ default: 0 })
  likesCount: number;

  @Column({ default: 0 })
  commentsCount: number;

  @Column({ default: 0 })
  sharesCount: number;

  @Column({ default: 0 })
  viewsCount: number;

  @Column('simple-array', { default: '' })
  likedBy: string[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
