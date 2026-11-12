import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { IUser } from './entities/user-entity';
import { UserService } from './users.service';

@Controller()
export class UserMicroservice {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ method: 'GET', path: 'get_user_by_id' })
  async getUserById(
    @Payload() payload: { userId: string },
  ): Promise<IUser | null> {
    const user = await this.userService.getUserById(payload.userId);
    if (!user) {
      console.log(`payload: ${JSON.stringify(payload)} error: user not found`);
    }

    return user ?? null;
  }

  @MessagePattern({
    method: 'GET',
    path: 'get_user_by_username',
  })
  async getUserByUserName(
    @Payload() payload: { username: string },
  ): Promise<IUser | null> {
    const user = await this.userService.getUserByUserName(payload.username);
    if (!user) {
      console.log(`payload: ${JSON.stringify(payload)} error: user not found`);
    }

    return user ?? null;
  }
}
