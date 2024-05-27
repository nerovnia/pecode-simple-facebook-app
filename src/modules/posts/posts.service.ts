import { Injectable, InternalServerErrorException, NotAcceptableException } from '@nestjs/common';
import { CreatePostDto } from '../../dto/create-post.dto';
import { ResponsePostDto } from '../../dto/response-post.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

import { JwtService } from '@nestjs/jwt';
import { Response } from '../../shared/interfaces/response.interface';
import { AuthService } from '../auth/auth.service';

import { User } from '../users/user.entity';


@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}


  async createPost(createPostDto: CreatePostDto, userEmail: string): Promise<Response> {
    try {
      const post = new Post();
      post.post = createPostDto.post;
      const user = await this.authService.findOne(userEmail);
      if (!user) throw new InternalServerErrorException('User not found');
      post.createdBy = user.id;
      const savedPostRecord = await this.postRepository.save(post);
      if (!savedPostRecord) throw new NotAcceptableException('Error create new post');
      const result = this.toPostDto(savedPostRecord);
      return {
        statusCode: 200,
        body: result,
      };
    } catch (error) {
      throw new NotAcceptableException('Error create new post');
    }
  }
  
  async getAllPosts() {

  }

  async selectAll(): Promise<Post[]> {
    try {
      const posts = await this.postRepository
        .createQueryBuilder('post')
        .where('user.email = :email', { email: email })
        .getOne();
      return userWithExistsEmail;
    } catch (error) {
      throw new Error(`Error finding user.`);
    }
  }


  private toPostDto(post: any): ResponsePostDto {
    return {
      id: post.id,
      post: post.post,
      createdBy: post.createdBy,
    };
  }
}
