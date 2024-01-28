import { Prisma } from '@prisma/client';

export class Tag implements Prisma.TagUncheckedCreateInput {
  id: number;
  name: string;
  books?: Prisma.BookCreateNestedManyWithoutTagsInput;
}
