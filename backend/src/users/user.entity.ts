import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  cpf: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ default: 'single', nullable: true })
  maritalStatus: string; // single, married, divorced, widow, relationship

  @Column({ default: 'other', nullable: true })
  gender: string; // male, female, other

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  occupation: string;

  @Column({ nullable: true })
  website: string;

  @Column({ default: 'pt-BR', nullable: true })
  language: string; // pt-BR, en-US, es-ES, etc

  @Column({ default: 0 })
  followers: number;

  @Column({ default: 0 })
  following: number;

  @Column({ default: 0 })
  postsCount: number;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  isFake: boolean; // Usuário fake para popular o app

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  lastLogin: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
