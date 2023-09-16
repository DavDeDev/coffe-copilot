'use server'
import {prisma} from '../cockroachDB';

interface User {
  id: number | bigint;
  name?: string;
  image_url?: string;
  short_bio?: string;
}

  export const getUsers = async () => {
    const users : User[] = await prisma.users.findMany();
    return users;
  }

export const getUser = async (id: number) => {
  const user = await prisma.users.findUnique({
    where: {
      user_id: id
    }
  });
  return user;
}

export const createUser = async (name: string, email: string) => {
  const user = await prisma.users.create({
    data: {
      name: name
    }
  });
  return user;
}

export const updateUser = async (id: number, name: string, email: string) => {
  const user = await prisma.users.update({
    where: {
      id: id
    },
    data: {
      name: name
    }
  });
  return user;
}