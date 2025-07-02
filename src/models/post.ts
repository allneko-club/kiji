import { prisma } from '@/lib/prisma';
import { BaseSearch } from '@/types/requests';
import { Prisma } from '@prisma/client';

type GetPostsParams = {
  authorId?: string;
  published?: boolean;
  query?: string;
} & BaseSearch;

export const getPosts = async (params: GetPostsParams) => {
  const where: Prisma.PostWhereInput = {
    authorId: params.authorId,
    published: params.published,
  };
  if (params.query?.length) {
    where.OR = [
      {
        title: {
          contains: params.query,
        },
        content: {
          contains: params.query,
        },
      },
    ];
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      take: params.perPage,
      skip: params.perPage * (params.page - 1),
      include: {
        author: true,
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.post.count({ where }),
  ]);

  return { posts, total };
};

// todo 非公開の投稿は投稿したユーザーのみ取得可能にするために、公開済みのみに絞り込むためのフラグ用引数を追加する
export const getPost = async (id: string) => {
  return prisma.post.findUnique({
    include: {
      author: true,
      category: true,
      tags: true,
    },
    where: {
      id: id,
    },
  });
};

export const getPostBySlug = async (slug: string) => {
  return prisma.post.findUnique({
    include: {
      author: true,
      category: true,
      tags: true,
    },
    where: {
      slug: slug,
    },
  });
};

type GetPostsByTagParams = {
  slug?: string;
  published?: boolean;
} & BaseSearch;

export const getPostsByTag = async (params: GetPostsByTagParams) => {
  const where = {
    published: params.published,
    tags: {
      some: {
        slug: params.slug,
      },
    },
  };

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      take: params.perPage,
      skip: params.perPage * (params.page - 1),
      include: {
        author: true,
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.post.count({ where }),
  ]);

  return { posts, total };
};

type GetPostsByCategoryParams = {
  slug: string;
  published?: boolean;
} & BaseSearch;

export const getPostsByCategory = async (params: GetPostsByCategoryParams) => {
  const where = {
    published: params.published,
    category: {
      is: {
        slug: params.slug,
      },
    },
  };

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      take: params.perPage,
      skip: params.perPage * (params.page - 1),
      include: {
        author: true,
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.post.count({ where }),
  ]);

  return { posts, total };
};
