import express from 'express';
import { POSTS_LIMIT } from '@/config/consts';
import { sanitizeUser } from '@/express/utils';
import { requireAuth } from '@/express/handlers/utils';
import { prisma } from '@/express/prisma';

const router = express.Router()

router.get('/api/posts', async (req, res) => {
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
      take: POSTS_LIMIT,
      skip: POSTS_LIMIT * (page - 1),
    }),
    prisma.post.count({where}),
  ])

  const totalPages = Math.ceil(total / POSTS_LIMIT);

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
    if (!user || post.authorId !== Number(user.id)) {
      res.sendStatus(404);
      return
    }
  }

  post.author = sanitizeUser(post.author)
  res.json(post);
})

router.post('/api/posts', async (req, res) => {
  const { user, error } = await requireAuth(req.cookies);
  if (!user) {
    res.status(401).json({ message: error });
    return
  }
  const postData = req.body;
  const result = await prisma.post.create({
    data: {
      ...postData,
      authorId: user.id
    }
  });

  res.json(result);
})

router.post('/api/posts/:id', async (req, res) => {
  const { user, error } = await requireAuth(req.cookies);
  if (!user) {
    res.status(401).json({ message: error });
    return;
  }

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
  const { user, error } = await requireAuth(req.cookies);
  if (!user) {
    res.status(401).json({ message: error });
    return
  }

  // todo 存在しない場合の動作確認
  const post = await prisma.post.delete({
    where: {
      id:  req.params.id,
      authorId: Number(user.id),
    },
  });

  res.json(post);
})


export default router
