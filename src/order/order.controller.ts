import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { OrderService, UserDTO } from './order.service';
import { Order } from './order.entity';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    async createOrder(@Body() data: Order): Promise<Order> {
        return this.orderService.createOrder(data);
    }

    @Get('/buyers')
    async getBuyers(): Promise<UserDTO[]> {
      return this.orderService.getBuyers();
    }

    @Post('/cancel/:orderId')
    async cancelOrder(@Param('orderId') orderId: string): Promise<Order> {
      try {
        const canceledOrder = await this.orderService.cancelOrder(orderId);
        return canceledOrder;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new NotFoundException(`Order cancellation failed.`);
      }
    }
    
}
