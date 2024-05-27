import { IsString, IsNumber, IsEmail } from 'class-validator';

export class UserDto {
  id: number;
  fullName: string;
  email: number;
}
