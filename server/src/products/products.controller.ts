import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/guard/JwtAuth.guard';
import { CreateProductsDto, fileName } from './dto/CreateProducts.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          callback(null, fileName(file));
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'upload done',
      data: file.filename,
      status: HttpStatus.CREATED,
    };
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  async createProduct(@Body() createProductsDto: CreateProductsDto) {
    return await this.productsService.createProduct(createProductsDto);
  }

  @Get(':imgPath')
  async seeUploadedFile(@Param('imgPath') imgPath, @Res() res: Response) {
    return res.sendFile(imgPath, { root: 'uploads' });
  }

  @Get()
  async fetchProducts() {
    return await this.productsService.fetchProducts();
  }
}
