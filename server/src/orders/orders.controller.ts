import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/JwtAuth.guard';
import { OrdersCreateDto } from './dto/orders.create.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  async createOrder(@Body() ordersCreateDto: OrdersCreateDto) {
    return await this.ordersService.createOrder(ordersCreateDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getOrders() {
    return await this.ordersService.getOrders();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOrderById(@Param('id') id: string) {
    return await this.ordersService.getOneOrderById(id);
  }

  @Put('confirm/:id')
  @UseGuards(JwtAuthGuard)
  async confirmOrder(@Param('id') id: string) {
    const order = await this.ordersService.getOneOrderById(id);
    if (!order) {
      throw new BadRequestException([`Order with id: ${id} not found`]);
    }

    await this.ordersService.confirmStatus(id);

    return { message: 'Order Confirmed', status: HttpStatus.OK };
  }
}
