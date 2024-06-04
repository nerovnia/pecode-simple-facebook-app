import { UseGuards, Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { PostDto } from '../../dto/post.dto';
import { PostsService } from './posts.service';

@Controller()
export class PostsController {

  constructor(
    private readonly postsService: PostsService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('posts')
  async getPosts() {
    const res = await this.postsService.getAllPosts();
    return res;
  }

  @UseGuards(AuthGuard)
  @Post('post/new')
  async createPost(
    @Body() createPostDto: PostDto, @Headers('Authorization') authorization: string
  ) {
    const userEmail = this.extractUserEmailFromToken(authorization);
    const res = await this.postsService.createPost(createPostDto, userEmail);
    return res;

  }

  private extractUserEmailFromToken(authorization: string): string {
    const token = authorization.split(' ')[1];
    const decoded = this.jwtService.decode(token, { json: true }) as { username: string };
    return decoded.username;
  }
}

