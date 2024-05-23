import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('user')
  getUser(): string {
    return 'Get User';
  }

  @Post('register')
  register(): string {
    return 'Post register';
  }

  @Post('login')
  login(): string {
    return 'Post login';
  }
}
