import { IsNotEmpty, IsUrl } from 'class-validator';

export class UpdateCoverDto {
  @IsNotEmpty()
  imgUrl: string;
}
