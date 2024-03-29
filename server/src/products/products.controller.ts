import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
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
import { UpdateCoverDto } from './dto/UpdateCover.dto';
import { UpdateProductDto } from './dto/UpdateProduct.dto';
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

  @Get('single/:id')
  async fetchById(@Param('id') id: string) {
    const product = await this.productsService.findOne({ id });

    if (!product) {
      throw new BadRequestException([`Product with id: ${id} is not found`]);
    }

    return product;
  }

  @Get('type/:type')
  async fetchByType(@Param('type') type: string) {
    const products = await this.productsService.find({ types: type });

    if (!products[0]) {
      throw new BadRequestException(['Products with this type not found']);
    }

    return products;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async removeById(@Param('id') id: string) {
    const product = await this.productsService.findOne({ id });

    if (!product) {
      throw new BadRequestException(`Product with id: ${id} is not found`);
    }

    await this.productsService.removeOne(id);

    return { message: 'Delete success', status: HttpStatus.OK };
  }

  @Put('update/:productId')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  async updateProduct(
    @Param('productId') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    /* If product found */
    const product = await this.productsService.findOne({ id });
    if (!product) {
      throw new BadRequestException([`Product with id: ${id} not found`]);
    }

    await this.productsService.updateProduct(updateProductDto, product);

    return { message: 'Product Updated', status: HttpStatus.OK };
  }

  @Put('update/cover/:productId')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  async updateCover(
    @Param('productId') id: string,
    @Body() updateCoverDto: UpdateCoverDto,
  ) {
    /* if Product found */
    const product = await this.productsService.findOne({ id });
    if (!product) {
      throw new BadRequestException([`Product with id: ${id} not found`]);
    }

    await this.productsService.updateCover(updateCoverDto, id);

    return { message: 'Product Updated', status: HttpStatus.OK };
  }
}
