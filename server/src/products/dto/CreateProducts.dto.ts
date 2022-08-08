import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { extname } from 'path';
import { Categories, Types } from './Types';

export class CreateProductsDto {
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

  createAt: Date;

  updateAt: Date;

  @IsNotEmpty()
  @IsEnum(Types)
  types: Types;

  @IsNotEmpty()
  @IsEnum(Categories)
  categories: Categories;

  @IsNotEmpty()
  @MaxLength(400)
  @MinLength(15)
  description: string;

  @IsNotEmpty()
  imgUrl: string;
}

export const fileName = (file) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const ext = extname(file.originalname);
  const filename = `${file.originalname.split('.')[0]}-${uniqueSuffix}${ext}`;
  return filename;
};
