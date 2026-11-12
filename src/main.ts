import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';
import { redisOptions } from './redis-options';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const configService = await app.get(ConfigService);
  const options = redisOptions(configService);
  const service =
    configService.get<string>('SERVICE_HOST') ?? 'USER_SERVICE_HOST';

  // Receives messages from web-api through Redis instead of a TCP port.
  const microservice = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.REDIS,
    options,
  });

  await microservice.listen();
  console.log(
    `${service} is listening on Redis ${options.host}:${options.port}`,
  );
}
bootstrap();
