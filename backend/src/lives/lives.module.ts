import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Live } from './live.entity';
import { LivesService } from './lives.service';
import { LivesController } from './lives.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Live])],
  providers: [LivesService],
  controllers: [LivesController],
  exports: [LivesService],
})
export class LivesModule {}
