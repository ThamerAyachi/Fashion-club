import { IsNotEmpty, IsUrl } from 'class-validator';

export class UpdateCoverDto {
  @IsNotEmpty()
  @IsUrl()
  imgUrl: string;
}
