import { IsNotEmpty, IsUrl } from 'class-validator';

export class UpdateAvatarDto {
  @IsUrl()
  @IsNotEmpty()
  imgUrl: string;
}
