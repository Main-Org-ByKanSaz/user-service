import { Controller } from '@nestjs/common';
import { AppService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppMicroservice {
  //todo fix name service
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ method: 'GET', path: 'get_user_by_id' })
  getUserById(@Payload() payload: { userId: string }): Promise<any> {
    return this.appService.getUserById(payload.userId);
  }

  @MessagePattern({
    method: 'GET',
    path: 'get_user_by_username',
  })
  getUserByUserName(@Payload() payload: { username: string }): Promise<any> {
    return this.appService.getUserByUserName(payload.username);
  }
}
