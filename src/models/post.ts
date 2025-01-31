import { prisma } from '@/lib/prisma';
import { BaseSearch } from '@/types/requests';

type GetPostsParams = {
  authorId?: string;
  published?: boolean;
  title?: string;
} & BaseSearch

export const getPosts = async (params: GetPostsParams) => {
  const where = {
    authorId: params.authorId,
    published: params.published,
    title: {
      contains: params.title,
    },
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      take: params.perPage,
      skip: params.perPage * (params.page - 1),
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    }),
    prisma.post.count({where}),
  ])

  return {posts, total}
}

type GetPostsByTagParams = {
  tagName?: string;
  published?: boolean;
} & BaseSearch

export const getPostsByTag = async (params: GetPostsByTagParams) => {
  const where = {
    published: params.published,
    tags: {
      some: {
        name: params.tagName
      }
    },
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      take: params.perPage,
      skip: params.perPage * (params.page - 1),
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    }),
    prisma.post.count({where}),
  ])

  return {posts, total}
}

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
    }
  })
}
