import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const configService = await app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
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
