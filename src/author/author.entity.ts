import { Prisma } from '@prisma/client';

export class Author implements Prisma.AuthorUncheckedCreateInput {
  id: number;
  name: string;
  age: number;
  photo?: string | null;
  books?: Prisma.BookCreateNestedManyWithoutAuthorsInput;
}
