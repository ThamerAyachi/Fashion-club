import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from './UserRole';

export class UpdateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(16)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(30)
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(30)
  password: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role?: UserRole;
}
