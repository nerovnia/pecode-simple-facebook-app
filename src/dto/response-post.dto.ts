import { IsString, IsNumber} from 'class-validator';

export class ResponsePostDto {
  id: number;
  createdBy: string;
  post: string;
}
