import { prisma } from '@/lib/prisma';

export const getTags = async () => {
  return prisma.tag.findMany({
    orderBy: {
      name: 'asc',
    }
  });
}

export const getTag = async (id: number) => {
  return prisma.tag.findUnique({
    where: {
      id: id,
    },
  });
}

export const getTagBySlug = async (slug: string) => {
  return prisma.tag.findUnique({
    where: {
      slug: slug,
    },
  });
}