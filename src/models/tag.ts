import { prisma } from '@/lib/prisma';

export const getTags = async () => {
  return prisma.tag.findMany({
    orderBy: {
      name: 'asc',
    }
  });
}

type GetTagParams = {
  slug?: string;
}
export const getTag = async (params: GetTagParams) => {
  return prisma.tag.findUnique({
    where: {
      slug: params.slug,
    },
  });
}