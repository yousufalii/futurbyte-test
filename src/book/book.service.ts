import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { Book } from './book.entity';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async createBook(data: Book): Promise<Book> {
    return this.prisma.book.create({ data });
  }

  async searchBooks({ name, tag, authorName }: { name?: string; tag?: string; authorName?: string }): Promise<Book[]> {
    return this.prisma.book.findMany({
      where: {
        OR: [
          name ? { title: { contains: name } } : {},
          tag ? { tags: { some: { name: { contains: tag } } } } : {},
          authorName ? { authors: { some: { name: { contains: authorName } } } } : {},
        ],
      },
    });
  }
}
