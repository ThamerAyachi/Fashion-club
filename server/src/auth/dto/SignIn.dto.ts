import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
