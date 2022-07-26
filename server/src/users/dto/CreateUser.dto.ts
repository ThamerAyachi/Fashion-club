import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
}

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}
