import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server is running on localhost:${process.env.PORT}`);
}
bootstrap();
