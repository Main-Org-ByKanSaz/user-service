import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { type MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';
import { DEFAULT_PORT } from './constant';
import { redisOptions } from './redis-options';

async function bootstrap() {
  // One app that serves HTTP on PORT (for the host's port and health checks)
  // and receives messages from web-api through Redis.
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = Number(configService.get('PORT')) || DEFAULT_PORT;
  const redis = redisOptions(configService);
  const service =
    configService.get<string>('SERVICE_HOST') ?? 'USER_SERVICE_HOST';

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: redis,
  });

  // Open the port first, so the host sees the service as up even while it is
  // still connecting to Redis.
  await app.listen(port, '0.0.0.0');
  console.log(`${service} HTTP is running on port ${port}`);

  await app.startAllMicroservices();
  console.log(`${service} is listening on Redis ${redis.host}:${redis.port}`);
}
void bootstrap();
