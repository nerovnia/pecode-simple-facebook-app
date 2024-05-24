import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(data: any): Promise<User> {
    try {
      return this.userRepository.save(data);
    } catch (error) {
      throw new Error(`Error create user: ${error.message}`);
    }
  }

  async findOne(condition: any): Promise<User> {
    try {
      return await this.userRepository.findOne(condition);
    } catch (error) {
      throw new Error(`Error finding user: ${error.message}`);
    }
  }
}
