import { prisma } from '@/express/prisma';
import { BaseSearch } from '@/types/api';

type Props = {
  authorId?: string;
  published?: boolean;
  sort?: string;
} & BaseSearch

export const getPosts = async (params: Props) => {
  const where = {
    authorId: params.authorId,
    published: params.published,
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

  const totalPages = Math.ceil(total / params.perPage);
  return {posts, total, totalPages}
}

// todo 非公開の投稿は投稿したユーザーのみ取得可能にするために、公開済みのみに絞り込むためのフラグ用引数を追加する
export const getPost = async (id: string) => {
  return prisma.post.findUnique({
    include: {
      author: true,
    },
    where: {
      id: id,
    }
  })
}
