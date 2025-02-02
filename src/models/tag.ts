import { prisma } from '@/lib/prisma';

export const getTags = async () => {
  return prisma.tag.findMany({
    orderBy: {
      name: 'asc',
    }
  });
}
