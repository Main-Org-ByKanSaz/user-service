import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppMicroservice {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ method: 'GET', path: 'get_user_by_id' })
  getHello(): any {
    return this.appService.getHello();
  }
}
