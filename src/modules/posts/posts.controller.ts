import { UseGuards, Controller, Get, Post, Body } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { CreatePostDto } from '../../dto/create-post.dto';
import { ResponsePostDto } from '../../dto/response-post.dto';
import { PostsService } from './posts.service';
import { Req } from '@nestjs/common';

@Controller('post')
export class PostsController {

  constructor(
    private readonly postsService: PostsService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  getPosts(): any { //CreatePostDto[] {
    return 'Get post';
  }

  @UseGuards(AuthGuard)
  @Post('new')
  createPost(
    @Body() createPostDto: CreatePostDto, @Req() req: any
  ):  any { //ResponsePostDto {
    const userEmail = this.extractUserEmailFromToken(req);
    return this.postsService.createPost(createPostDto, userEmail);
  }

  private extractUserEmailFromToken(req: any): string {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = this.jwtService.decode(token, { json: true }) as { username: string };
    return decoded.username;
  }
  
}

