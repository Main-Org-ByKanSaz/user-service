import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppMicroservice } from './app.microservice';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppMicroservice],
  providers: [AppService],
})
export class AppModule {}
