import { IsString, IsNumber} from 'class-validator';

export class PostDto {
  @IsNumber()
  id?: number;

  @IsNumber()
  createdBy: number;

  @IsString()
  post: string;
}
