import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) {}

  async createTag(data: Tag): Promise<Tag> {
    return this.prisma.tag.create({ data });
  }
}
