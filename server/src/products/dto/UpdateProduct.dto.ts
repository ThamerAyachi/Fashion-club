import {
  IsNotEmpty,
  IsNumberString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(1)
  @MaxLength(10)
  price: string;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(1)
  @MaxLength(5)
  quantity: string;

  @IsNotEmpty()
  @MaxLength(400)
  @MinLength(15)
  description: string;
}
