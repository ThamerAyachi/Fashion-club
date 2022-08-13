import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products as ProductsEntity } from 'src/typeorm/Products';
import { Repository } from 'typeorm';
import { CreateProductsDto } from './dto/CreateProducts.dto';
import { UpdateCoverDto } from './dto/UpdateCover.dto';
import { UpdateProductDto } from './dto/UpdateProduct.dto';

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

  async removeOne(condition: any): Promise<void> {
    await this.productsRepository.delete(condition);

    return;
  }

  async updateProduct(
    updateProductDto: UpdateProductDto,
    product: ProductsEntity,
  ) {
    const productId = product.id;
    delete product.id;
    const updatedProduct = {
      ...product,
      ...updateProductDto,
      updateAt: new Date().toISOString().slice(0, 19),
    };

    return await this.productsRepository.update(
      { id: productId },
      { ...updatedProduct },
    );
  }

  async updateCover(updateCoverDto: UpdateCoverDto, productId: string) {
    const imgUrl = updateCoverDto.imgUrl;
    const id = parseInt(productId);

    return await this.productsRepository.update({ id }, { imgUrl });
  }
}
