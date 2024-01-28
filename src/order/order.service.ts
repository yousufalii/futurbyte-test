import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Order } from './order.entity';
import { Prisma } from '@prisma/client';

export type UserDTO = {
  id: number;
  username: string;
  email: string;
};

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(data: Order): Promise<Order> {
    const { userId, bookId } = data;
    const [existingUser, existingBook] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: userId } }),
      this.prisma.book.findUnique({ where: { id: bookId } }),
    ]);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    if (!existingBook) {
      throw new NotFoundException(`Book with ID ${bookId} not found.`);
    }
    const requiredPoints = existingBook.price;
    if (existingUser.points < requiredPoints) {
      throw new BadRequestException(
        `User does not have enough points to buy this book.`,
      );
    }
    await this.prisma.user.update({
      where: { id: userId },
      data: { points: { decrement: requiredPoints } },
    });
    const prismaOrderInput = this.convertToPrismaOrderInput(data);
    return this.prisma.order.create({
      data: {
        ...prismaOrderInput,
        book: {
          connect: {
            id: bookId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  private convertToPrismaOrderInput(data: Order): Prisma.OrderCreateInput {
    const { id, userId, bookId, authorId, ...orderWithoutId } = data;
    const { book, author, ...rest } = orderWithoutId;
    return {
      ...rest,
      user: {
        connect: {
          id: userId,
        },
      },
      book: {
        connect: {
          id: bookId,
        },
      },
      author: {
        connect: {
          id: authorId,
        },
      },
    };
  }

  async getBuyers(): Promise<UserDTO[]> {
    const ordersWithBuyers = await this.prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });
    const buyersSet = new Set(ordersWithBuyers.map((order) => order.user));
    const buyers = Array.from(buyersSet);
    const buyersDTO: UserDTO[] = buyers.map((buyer) => ({
      id: buyer.id,
      username: buyer.username,
      email: buyer.email,
    }));
    return buyersDTO;
  }

  async cancelOrder(orderId: string): Promise<Order> {
    console.log(orderId, '++++++++');
    const orderIdAsNumber = parseInt(orderId, 10);
    const existingOrder = await this.prisma.order.findUnique({
      where: { id: orderIdAsNumber },
    });
    console.log(existingOrder, '*********');
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${orderId} not found.`);
    }
    const updatedOrder = await this.prisma.order.update({
      where: { id: orderIdAsNumber },
      data: { orderStatus: 'cancelled' },
    });
    return updatedOrder;
  }
}
