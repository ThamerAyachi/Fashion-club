import {
  Body,
  Controller,
  Get,
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

  @Post('create')
  @UsePipes(ValidationPipe)
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
  async createProduct(
    @Body() createProductsDto: CreateProductsDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    createProductsDto.imgUrl = file.filename;
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
