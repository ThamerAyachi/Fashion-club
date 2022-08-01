import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(16)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(30)
  email: string;

  @IsNotEmpty()
  @MaxLength(25)
  @MinLength(5)
  subject: string;

  @IsNotEmpty()
  @MaxLength(400)
  @MinLength(15)
  message: string;

  createAt: Date;

  @IsNotEmpty()
  deviceType: string;
}
