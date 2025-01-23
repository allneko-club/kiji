import { prisma } from '@/express/prisma';
import { BaseSearch } from '@/types/api';

export const getUsers = async (params: BaseSearch) => {
  const where = {}
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      take: params.perPage,
      skip: params.perPage * (params.page - 1),
    }),
    prisma.user.count({where}),
  ])
  return {users, total}
}

export const getUser = async (id: number) => {
  return prisma.user.findUnique({
    where: {
      id: id,
    }
  });
}
