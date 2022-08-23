import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders as OrdersEntity } from 'src/typeorm/Orders';
import { Products as ProductsEntity } from 'src/typeorm/Products';
import { Repository } from 'typeorm';
import { OrdersCreateDto } from './dto/orders.create.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersEntity)
    private readonly OrdersRepo: Repository<OrdersEntity>,
    @InjectRepository(ProductsEntity)
    private readonly productsRepo: Repository<ProductsEntity>,
  ) {}

  async createOrder(orderDto: OrdersCreateDto) {
    const productsId = [];

    orderDto.products.map((p) => {
      productsId.push(p.id);
    });

    const dbProducts = await this.productsRepo.find();

    const Products = [];

    dbProducts.map((p) => {
      if (productsId.includes(p.id)) {
        Products.push(p);
      }
    });

    const myDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const dataSaving = {
      fullName: orderDto.fullName,
      city: orderDto.city,
      place: orderDto.place as unknown as string,
      state: orderDto.state,
      street: orderDto.street,
      telephone: orderDto.telephone,
      zip: orderDto.zip,
      createAt: myDate,
      status: false,
    };
    const newOrder = await this.OrdersRepo.create({ ...dataSaving });

    newOrder.products = Products;

    return await this.OrdersRepo.save(newOrder);
  }

  async getOrders() {
    const orders = await this.OrdersRepo.find({ relations: ['products'] });

    return orders;
  }

  async getOneOrderById(id: string) {
    const order = await this.OrdersRepo.createQueryBuilder('orders')
      .leftJoinAndSelect('orders.products', 'products')
      .where('orders.id = :orderId', { orderId: id })
      .getOne();

    return order;
  }

  async confirmStatus(orderId) {
    const id = parseInt(orderId);

    return await this.OrdersRepo.update({ id }, { status: true });
  }
}
