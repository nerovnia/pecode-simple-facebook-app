import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/user.entity';
import { PostsModule } from './modules/posts/posts.module';
import { JwtModule } from '@nestjs/jwt';
import { appConfig } from './config/app.default.config';
import 'dotenv/config';
import { AuthService } from './modules/auth/auth.service';

//import { UserRepository } from './modules/auth/';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    UsersModule,
    AuthModule,
    PostsModule,
    TypeOrmModule.forFeature([User]),
    PostsModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXP_TIME || appConfig.auth.jwtExpTime },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
  exports: [AuthService],
})
export class AppModule {}
