import { Prisma } from '@prisma/client';

export class Order implements Prisma.OrderUncheckedCreateInput {
  id?: number; 
  userId: number; 
  bookId: number;
  authorId: number;
  quantity: number;
  totalPrice: number;
  shippingAddress: string;
  paymentMethod: string;
  orderDate: Date;
  book?: Prisma.BookCreateNestedOneWithoutOrdersInput;
  author?: Prisma.AuthorCreateNestedOneWithoutOrdersInput;
}
