import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.entity';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async createBook(@Body() data: Book): Promise<Book> {
    return this.bookService.createBook(data);
  }

  @Get('search')
  async searchBooks(
    @Query('name') name?: string,
    @Query('tag') tag?: string,
    @Query('authorName') authorName?: string,
  ): Promise<Book[]> {
    return this.bookService.searchBooks({ name, tag, authorName });
  }
}
