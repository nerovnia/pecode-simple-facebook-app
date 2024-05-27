import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: number;

  @IsString()
  password: string;
}
