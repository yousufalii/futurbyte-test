import { Controller, Post, Body } from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from './tag.entity';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async createTag(@Body() data: Tag): Promise<Tag> {
    return this.tagService.createTag(data);
  }
}
