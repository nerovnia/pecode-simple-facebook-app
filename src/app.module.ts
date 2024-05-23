import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { PostsController } from './posts/posts.controller';

@Module({
  imports: [],
  controllers: [AppController, AuthController, PostsController],
  providers: [AppService],
})
export class AppModule {}
