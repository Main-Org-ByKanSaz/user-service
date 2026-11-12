import { Controller, Get } from '@nestjs/common';

/** For the host's health check, such as Render's Health Check Path. */
@Controller('health')
export class HealthController {
  @Get()
  check() {
    return { status: 'ok' };
  }
}
