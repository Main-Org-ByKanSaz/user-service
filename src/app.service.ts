import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  async getHello(): Promise<any> {
    return 'Hello from User Service!';
  }
}
