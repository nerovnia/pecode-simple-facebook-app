import { Controller, Get, HttpCode, Post, Body } from '@nestjs/common';
//import crypto from 'crypto';
import { createHash } from 'node:crypto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('user')
  getUser(): string {
    return 'Get User';
  }

  @Post('register')
  @HttpCode(201)
  async register(
    @Body('name') fullName: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const hash = createHash('sha256').update(password).digest('hex');

    const res = this.authService.create({
      fullName,
      email,
      password: hash,
    });
    return JSON.stringify(res);
  }

  @Post('login')
  @HttpCode(200)
  async login() {
    return 'Post login';
  }
}
