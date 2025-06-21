import { prisma } from '@/lib/prisma';

export const getTags = async () => {
  return prisma.tag.findMany({
    orderBy: {
      name: 'asc',
    },
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });
};

export const getTag = async (id: number) => {
  return prisma.tag.findUnique({
    where: {
      id: id,
    },
  });
};

export const getTagBySlug = async (slug: string) => {
  return prisma.tag.findUnique({
    where: {
      slug: slug,
    },
  });
};
