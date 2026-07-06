import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getUserById(userId: string): Promise<User | null> {
    return this.userModel.findOne({ userId }).lean();
  }

  async getUserByUserName(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).lean();
  }
}
