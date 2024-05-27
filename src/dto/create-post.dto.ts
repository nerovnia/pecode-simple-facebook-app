import { IsString, IsNumber} from 'class-validator';

export class CreatePostDto {
  @IsNumber()
  createdBy: number;

  @IsString()
  post: string;
}
