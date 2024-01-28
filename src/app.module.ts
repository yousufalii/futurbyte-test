import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { TagController } from './tag/tag.controller';
import { TagService } from './tag/tag.service';
import { AuthorController } from './author/author.controller';
import { AuthorService } from './author/author.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  controllers: [
    AppController,
    BookController,
    TagController,
    AuthorController,
    OrderController,
    UserController,
  ],
  providers: [
    AppService,
    PrismaService,
    BookService,
    TagService,
    AuthorService,
    OrderService,
    UserService,
  ],
})
export class AppModule {}
