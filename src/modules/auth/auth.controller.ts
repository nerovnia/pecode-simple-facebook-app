import {
  UseGuards,
  Controller,
  Get,
  HttpCode,
  Post,
  Body,
  NotAcceptableException,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { createHash } from 'node:crypto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UserDto } from '../../dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  async register(
    @Body() createUserDto: UserDto
  ) {
    const hash = createHash('sha256').update(createUserDto.password).digest('hex');
    try {
      const res = await this.authService.create({
        fullName: createUserDto.fullName,
        email: createUserDto.email,
        password: hash,
      });
      return res;
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const res = await this.authService.login(email, password);
    return res;
  }

  @UseGuards(AuthGuard)
  @Get('user')
  async getUser(@Query('id') userId: string) {
    const id = Number.parseInt(userId);
    if (!id) throw new NotFoundException();
    const res = await this.authService.getUser(id);
    return res;
  }
}
