import { prisma } from '@/lib/prisma';

export const getCategories = async () => {
  return prisma.category.findMany({ orderBy: { id: 'asc' } });
};

export const getCategoryById = async (id: number) => {
  return prisma.category.findUnique({ where: { id: id } });
};

export const getCategoryBySlug = async (slug: string) => {
  return prisma.category.findUnique({ where: { slug: slug } });
};
