import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Author } from './author.entity';

@Injectable()
export class AuthorService {
  constructor(private readonly prisma: PrismaService) {}

  async createAuthor(data: Author): Promise<Author> {
    return this.prisma.author.create({ data });
  }
}
