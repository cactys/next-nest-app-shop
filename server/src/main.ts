import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Number(process.env.HOST_PORT) || 3030, () => {
    console.log(`Server Started... Port: ${process.env.HOST_PORT}`);
  });
}
bootstrap();
