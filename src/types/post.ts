import { Prisma } from '@prisma/client';

export type PostWithCategoryAuthor = Prisma.PostGetPayload<{
  include: {
    author: true;
    category: true;
  };
}>;
