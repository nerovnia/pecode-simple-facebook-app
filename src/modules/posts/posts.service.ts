import { Injectable, NotAcceptableException } from '@nestjs/common';
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
      console.log(user);
      //post.createdBy = userId;
      const result = await this.postRepository.save(post);
      if (!result) throw new NotAcceptableException('Error create new post');
      return {
        statusCode: 200,
        body: {
          result,
        },
      };
    } catch (error) {
      throw new NotAcceptableException('Error create new post');
    }
  }

}
