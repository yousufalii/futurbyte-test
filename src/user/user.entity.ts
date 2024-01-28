import { Prisma } from '@prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
  id: number;
  username: string;
  email: string;
  password: string;
  points: number;
}

