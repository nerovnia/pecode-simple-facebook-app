import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { PostsController } from './posts/posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig)],
  controllers: [AppController, AuthController, PostsController],
  providers: [AppService],
})
export class AppModule {}
