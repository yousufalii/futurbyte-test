import { Controller, Post, Body } from '@nestjs/common';
import { AuthorService } from './author.service';
import { Author } from './author.entity';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async createAuthor(@Body() data: Author): Promise<Author> {
    return this.authorService.createAuthor(data);
  }
}
