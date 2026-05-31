import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';
import { Comment } from '../comments/comment.entity';
import { Church } from '../churches/church.entity';
import { Live } from '../lives/live.entity';
import * as cron from 'node-cron';

const FAKE_COMMENTS = [
  'Glória a Deus! 🙏',
  'Amém! Que lindo!',
  'Deus abençoe muito! ✨',
  'Que Deus continue te guardando',
  'Maravilhoso! Obrigado Senhor',
  'Aleluia! Graças a Deus',
  'Qual bênção, que privilégio',
  'Que comovedora a história de fé',
  'Deus é fiel!',
  'Adorei esse conteúdo',
  'Excelente mensagem',
  'Que lindo testemunho',
  'Graças ao nosso Deus',
  'Verdade absoluta do Senhor',
  'Jesus te ama',
  'Que privilégio estar aqui',
  'Deus é perfeito',
  'Crendo em Jesus',
  'Fé verdadeira',
  'Que mensagem poderosa',
];

const FAKE_NAMES = [
  'Maria Silva', 'João Santos', 'Pedro Costa', 'Ana Paula', 'Carlos Ferreira',
  'Lucia Oliveira', 'Francisco Xavier', 'Mariana Rosa', 'Leonardo Souza', 'Beatriz Lima',
  'Diego Martins', 'Fernanda Gomes', 'Rafael Alves', 'Jessica Costa', 'Bruno Rocha',
  'Patricia Dias', 'Gustavo Pereira', 'Amanda Vieira', 'Felipe Machado', 'Vanessa Barbosa',
];

@Injectable()
export class BotService {
  private readonly logger = new Logger(BotService.name);
  private botActive = process.env.BOT_ENABLED === 'true';
  private botSpeed = process.env.BOT_SPEED || 'normal';

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
    @InjectRepository(Church) private churchesRepository: Repository<Church>,
    @InjectRepository(Live) private livesRepository: Repository<Live>,
  ) {
    this.initializeBot();
  }

  private initializeBot() {
    if (!this.botActive) return;

    this.logger.log(`Bot iniciado - Velocidade: ${this.botSpeed}`);

    // Cron jobs
    const intervals = {
      slow: '*/10 * * * *', // 10 minutos
      normal: '*/5 * * * *', // 5 minutos
      fast: '* * * * *', // 1 minuto
    };

    cron.schedule(intervals[this.botSpeed] || intervals.normal, () => {
      this.generateFakeActivity();
    });
  }

  private async generateFakeActivity() {
    try {
      const realPosts = await this.postsRepository.find({
        where: { isFake: false },
      });

      for (const post of realPosts) {
        // Adicionar comentários fake
        if (Math.random() > 0.5) {
          const randomName = FAKE_NAMES[Math.floor(Math.random() * FAKE_NAMES.length)];
          const fakeUser = await this.getFakeUser(randomName);

          if (fakeUser) {
            const randomComment = FAKE_COMMENTS[Math.floor(Math.random() * FAKE_COMMENTS.length)];
            await this.commentsRepository.save({
              content: randomComment,
              authorId: fakeUser.id,
              postId: post.id,
              isActive: true,
            });

            post.commentsCount += 1;
          }
        }

        // Adicionar likes fake
        if (Math.random() > 0.3) {
          const randomLikes = Math.floor(Math.random() * 100) + 1;
          post.likesCount += randomLikes;
        }

        // Incrementar views
        post.viewsCount += Math.floor(Math.random() * 500) + 50;

        await this.postsRepository.save(post);
      }

      // Atualizar lives
      const activeLives = await this.livesRepository.find({
        where: { status: 'live' },
      });

      for (const live of activeLives) {
        live.viewersCount += Math.floor(Math.random() * 50) + 10;
        live.likesCount += Math.floor(Math.random() * 20) + 5;
        await this.livesRepository.save(live);
      }

      this.logger.log(`Atividade fake gerada - Posts: ${realPosts.length}, Lives: ${activeLives.length}`);
    } catch (error) {
      this.logger.error('Erro ao gerar atividade fake:', error);
    }
  }

  private async getFakeUser(name: string) {
    let user = await this.usersRepository.findOne({
      where: { fullName: name, isFake: true },
    });

    if (!user) {
      const randomEmail = `user${Date.now()}@fake.local`;
      user = await this.usersRepository.save({
        fullName: name,
        email: randomEmail,
        password: 'fake_password',
        isFake: true,
        isActive: true,
        profilePicture: `https://ui-avatars.com/api/?name=${name}&background=random`,
      });
    }

    return user;
  }

  async enableBot() {
    this.botActive = true;
    this.initializeBot();
    this.logger.log('Bot ativado');
  }

  async disableBot() {
    this.botActive = false;
    this.logger.log('Bot desativado');
  }

  async setBotSpeed(speed: 'slow' | 'normal' | 'fast') {
    this.botSpeed = speed;
    this.logger.log(`Velocidade do bot alterada para: ${speed}`);
    this.initializeBot();
  }

  async createFakeUsers(count: number) {
    const users = [];
    for (let i = 0; i < count; i++) {
      const randomName = FAKE_NAMES[Math.floor(Math.random() * FAKE_NAMES.length)];
      const user = this.usersRepository.create({
        fullName: `${randomName} ${i}`,
        email: `fake${i}${Date.now()}@local.fake`,
        password: 'fake',
        isFake: true,
        isActive: true,
        profilePicture: `https://ui-avatars.com/api/?name=Fake${i}&background=random`,
      });
      users.push(user);
    }
    return this.usersRepository.save(users);
  }

  getStatus() {
    return {
      active: this.botActive,
      speed: this.botSpeed,
    };
  }
}
