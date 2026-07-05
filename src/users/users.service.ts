import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user.schema';

@Injectable()
export class AppService {
  //todo fix name service
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  //todo fix interface
  async getUserById(userId: string): Promise<any> {
    return this.userModel.findOne({ userId }).lean();
  }

  //todo fix interface
  async getUserByUserName(username: string): Promise<any> {
    return this.userModel.findOne({ username }).lean();
  }
}
