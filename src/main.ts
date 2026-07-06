import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';
import { DEFAULT_PORT } from './constant';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const configService = await app.get(ConfigService);
  const port = configService.get<number>('PORT') || DEFAULT_PORT;
  const service =
    configService.get<string>('SERVICE_HOST') ?? 'USER_SERVICE_HOST';

  const microservice = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: { port },
  });

  await microservice.listen();
  console.log(`${service} is running on TCP port: ${port}`);
}
bootstrap();
