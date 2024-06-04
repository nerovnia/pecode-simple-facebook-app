import { UseGuards, Controller, Get, Post, Body } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { PostDto } from '../../dto/post.dto';
import { PostsService } from './posts.service';
import { Req } from '@nestjs/common';

@Controller()
export class PostsController {

  constructor(
    private readonly postsService: PostsService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('posts')
  getPosts(): any {
    return this.postsService.getAllPosts();
  }

  @UseGuards(AuthGuard)
  @Post('post/new')
  createPost(
    @Body() createPostDto: PostDto, @Req() req: any
  ):  any {
    const userEmail = this.extractUserEmailFromToken(req);
    return this.postsService.createPost(createPostDto, userEmail);
  }

  private extractUserEmailFromToken(req: any): string {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = this.jwtService.decode(token, { json: true }) as { username: string };
    return decoded.username;
  }
  
}

