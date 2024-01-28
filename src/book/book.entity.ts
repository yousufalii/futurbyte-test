import { Prisma } from '@prisma/client';

export class Book implements Prisma.BookUncheckedCreateInput {
    id: number;
    title: string;
    coverImage?: string | null;
    price: number;
    tags?: Prisma.TagCreateNestedManyWithoutBooksInput;
    authors?: Prisma.AuthorCreateNestedManyWithoutBooksInput;
}
