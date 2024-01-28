// src/prisma/prisma.service.ts
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient, Book, Order, User, Tag, Author } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor() {
    super();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async createBook(data: Book): Promise<Book> {
    return this.book.create({ data });
  }
}
