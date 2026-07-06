import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './users.service';
import { IUser } from './entities/user-entity';

@Controller()
export class UserMicroservice {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ method: 'GET', path: 'get_user_by_id' })
  async getUserById(
    @Payload() payload: { userId: string },
  ): Promise<IUser | null> {
    const user = await this.userService.getUserById(payload.userId);
    if (!user) {
      console.log(`payload: ${payload} error: user not found`);
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
      console.log(`payload: ${payload} error: user not found`);
    }

    return user ?? null;
  }
}
