import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { createHash } from 'node:crypto';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../../dto/user.dto';
import { Response } from '../../shared/interfaces/response.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(data: any): Promise<Response> {
    try {
      console.log('Auth service ---------------------------');
      console.log(data);
      const result = await this.userRepository.save(data);
      if (!result) throw new NotAcceptableException('Error create new user');
      const payload = { username: data.email };
      return {
        statusCode: 200,
        body: {
          access_token: await this.jwtService.signAsync(payload),
        },
      };
    } catch (error) {
      if (error instanceof NotAcceptableException) {
        throw new NotAcceptableException(error.message);
      } else {
        throw new InternalServerErrorException('Internal server error!');
      }
    }
  }

  async login(email: string, password: string): Promise<Response> {
    try {
      const result = await this.findOne(email);
      const hash = createHash('sha256').update(password).digest('hex');
      if ((!result) || (hash !== result.password)) {
        throw new UnauthorizedException('User is absend or password is incorrect!');
      }
      const payload = { username: email };
      return {
        statusCode: 200,
        body: {
          access_token: await this.jwtService.signAsync(payload),
        },
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message);
      } else {
        throw new InternalServerErrorException('Internal server error!');
      }
    }
  }

  async findOne(email: string): Promise<User> {
    try {
      const userWithExistsEmail = await this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email: email })
        .getOne();
      return userWithExistsEmail;
    } catch (error) {
      throw new UnauthorizedException('User is absend or password is incorrect!');
    }
  }

  async getUser(id: number): Promise<UserDto> {
    try {
      const userWithExistsId = await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: id })
        .getOne();
      if (!userWithExistsId) throw new NotFoundException(`User is absend.`);
      const result = this.toUserDto(userWithExistsId)
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException('Internal server error!');
      }
    }
  }

  private toUserDto(user: any): UserDto {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    };
  }
}
