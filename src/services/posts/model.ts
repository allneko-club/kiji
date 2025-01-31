import { prisma } from '@/lib/prisma';
import { BaseSearch } from '@/types/requests';

type GetPostsParams = {
  authorId?: string;
  published?: boolean;
  sort?: string;
  title?: string;
  tagName?: string;
} & BaseSearch

export const getPosts = async (params: GetPostsParams) => {
  const where = {
    authorId: params.authorId,
    published: params.published,
    title: {
      contains: params.title,
    },
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
      tags: true,
    },
    where: {
      id: id,
    }
  })
}
