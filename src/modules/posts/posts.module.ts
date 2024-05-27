import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { JwtModule } from '@nestjs/jwt';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';
import { AuthService } from '../auth/auth.service';
import { appConfig } from '../../config/app.default.config';
import 'dotenv/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Post]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXP_TIME || appConfig.auth.jwtExpTime },
    }),
  ],
  controllers: [PostsController],
  providers: [PostsService, AuthService],
})
export class PostsModule {}
