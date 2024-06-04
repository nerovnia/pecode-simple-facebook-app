import { Injectable, InternalServerErrorException, NotAcceptableException } from '@nestjs/common';
import { PostDto } from '../../dto/post.dto';
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


  async createPost(createPostDto: PostDto, userEmail: string): Promise<Response> {
    try {
      const errMsg = 'Error create new post';
      const post = new Post();
      post.post = createPostDto.post;
      const user = await this.authService.findOne(userEmail);
      if (!user) throw new NotAcceptableException(errMsg);
      post.createdBy = user.id;
      const savedPostRecord = await this.postRepository.save(post);
      if (!savedPostRecord) throw new NotAcceptableException(errMsg);
      const result = this.toPostDto(savedPostRecord);
      return {
        statusCode: 200,
        body: result,
      };
    } catch (error) {
      if (error instanceof NotAcceptableException) {
        throw new NotAcceptableException('error.message');
      } else {
        throw new InternalServerErrorException('Internal server error!');
      }
    }
  }
  
  async getAllPosts(): Promise<Post[]> {
    try {
      const posts = await this.postRepository
      .createQueryBuilder('post')
      .innerJoin('post.createdBy', 'iuser')
      .select([
        'post.id',
        'post.post',
        'post.createdById',
        'iuser.fullName',
        'iuser.email'
      ])
      .getRawMany();
      return posts;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error!');
    }
  }


  private toPostDto(post: any): PostDto {
    return {
      id: post.id,
      post: post.post,
      createdBy: post.createdBy,
    };
  }
}
