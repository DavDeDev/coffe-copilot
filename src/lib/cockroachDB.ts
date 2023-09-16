import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function tryy() {
  const user = await prisma.users.findMany();
  console.log(user);
}
