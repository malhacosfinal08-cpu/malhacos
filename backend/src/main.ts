import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());
  app.enableCors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useWebSocketAdapter(new IoAdapter(app));

  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`\n✅ Application is running on: http://localhost:${port}`);
  console.log(`📡 WebSocket URL: ws://localhost:${port}`);
  console.log(`🔐 JWT Auth Enabled`);
  console.log(`🤖 Bot Status: ${process.env.BOT_ENABLED === 'true' ? 'ATIVO' : 'DESATIVO'}\n`);
}

bootstrap();
