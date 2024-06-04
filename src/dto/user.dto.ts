import { IsString, IsEmail, IsNumber } from 'class-validator';

export class UserDto {
  @IsNumber()
  id?: string;

  @IsString()
  fullName: string;

  @IsEmail()
  email: number;

  @IsString()
  password?: string;
}
