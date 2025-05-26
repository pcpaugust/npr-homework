import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5000', 'http://192.168.56.1:5000'], // Allow your frontend's origin
    credentials: true,              // If you're using cookies or auth headers
  });

  await app.listen(3000);
}
bootstrap();

