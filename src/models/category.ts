import { prisma } from '@/lib/prisma';

export const getCategories = async () => {
  return prisma.category.findMany({
    orderBy: {
      id: 'asc',
    },
  });
};

export const getCategory = async (id: number) => {
  return prisma.category.findUnique({
    where: {
      id: id,
    },
  });
};
