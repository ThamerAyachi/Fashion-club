import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Places, ProductSent } from './Types';

export class OrdersCreateDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  fullName: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  city: string;

  @IsNotEmpty()
  @IsEnum(Places)
  place: Places;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  state: string;

  street: string;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(8)
  @MaxLength(8)
  telephone: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  zip: string;

  products: ProductSent[];
}
