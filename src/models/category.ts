import { prisma } from '@/lib/prisma';

export const getCategories = async () => {
  return prisma.category.findMany({
    orderBy: {
      id: 'asc',
    },
    include: {
      _count: {
        select: { posts: true },
      },
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

export const getCategoryBySlug = async (slug: string) => {
  return prisma.category.findUnique({
    where: {
      slug: slug,
    },
  });
};
