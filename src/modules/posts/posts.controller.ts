import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class PostsController {
  @Get('post')
  getPost(): string {
    return 'Get post';
  }

  @Post('post')
  createPost(): string {
    return 'Create post';
  }
}
