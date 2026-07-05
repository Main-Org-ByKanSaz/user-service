import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppMicroservice } from './users.microservice';
import { AppService } from './users.service';
import { User, UserSchema } from '../user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppMicroservice],
  providers: [AppService],
  exports: [AppService],
})
export class UsersModule {}
