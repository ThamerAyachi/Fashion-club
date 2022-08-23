import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders as OrdersEntity } from 'src/typeorm/Orders';
import { Products as ProductsEntity } from 'src/typeorm/Products';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersEntity, ProductsEntity])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
