import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products as ProductsEntity } from 'src/typeorm/Products';
import { Repository } from 'typeorm';
import { CreateProductsDto } from './dto/CreateProducts.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
  ) {}

  async createProduct(createProductsDto: CreateProductsDto) {
    const myDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const product = await this.productsRepository.create({
      ...createProductsDto,
      createAt: myDate,
      updateAt: myDate,
    });

    return await this.productsRepository.save(product);
  }

  async fetchProducts() {
    return await this.productsRepository.find();
  }

  async findOne(condition: any) {
    return await this.productsRepository.findOneBy(condition);
  }
}
