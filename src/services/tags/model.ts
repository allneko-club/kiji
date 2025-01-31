import { prisma } from '@/lib/prisma';

export const getTags = async () => {
  const tags = await prisma.tag.findMany({
    orderBy: {
      name: 'asc',
    }
  })

  return {tags}
}
