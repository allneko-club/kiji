import express from 'express';
import { sanitizeUser } from '@/express/utils';
import { requireAuth } from '@/express/handlers/utils';
import { prisma } from '@/express/prisma';

const router = express.Router()

router.get('/api/posts', async (req, res) => {
  const perPage = Number(req.query.PerPage || 10);
  const page = Number(req.query.page || 1);
  // todo isMyPosts に応じて 非公開の記事も表示するか切り分ける
  // const isMyPosts = req.query.myPosts === "true";
  const where = {}

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      include: {
        author: true,
      },
      where,
      take: perPage,
      skip: perPage * (page - 1),
    }),
    prisma.post.count({where}),
  ])

  const totalPages = Math.ceil(total / perPage);

  res.json({
    posts,
    page,
    total,
    totalPages,
  });
})

router.get('/api/posts/:id', async (req, res) => {
  const post = await prisma.post.findUnique({
    include: {
      author: true,
    },
    where: {
      id: req.params.id,
    }
  });

  if (!post) {
    res.sendStatus(404);
    return;
  }else if (!post.published) {
    // 非公開の投稿は投稿したユーザーのみ取得可能
    const { user } = await requireAuth(req.cookies);
    if (!user || post.authorId !== user.id) {
      res.sendStatus(404);
      return
    }
  }

  post.author = sanitizeUser(post.author)
  res.json(post);
})

router.post('/api/posts', async (req, res) => {
  const postData = req.body;
  const result = await prisma.post.create({
    data: postData,
  });

  res.json(result);
})

router.post('/api/posts/:id', async (req, res) => {
  const data = req.body;
  const result = await prisma.post.update({
    where: {
      id: req.params.id
    },
    data,
  });
  res.json(result);
})

router.delete('/api/posts/:id', async (req, res) => {
  // todo 存在しない場合の動作確認
  const post = await prisma.post.delete({
    where: { id:  req.params.id },
  });

  res.json(post);
})


export default router
