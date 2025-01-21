import express from 'express';
import { POSTS_LIMIT, UserRole } from '@/config/consts';
import { hash, sanitizeUser } from '@/__mocks__/utils';
import { requireAuth } from '@/__mocks__/handlers/utils';
import { db, persistDb } from '@/__mocks__/db';

const router = express.Router()

router.get('/api/posts', async (req, res) => {
  const page = Number(req.query.page || 1);
  // todo isMyPosts に応じて 非公開の記事も表示するか切り分ける
  // const isMyPosts = req.query.myPosts === "true";

  const posts = db.post
    .findMany({ take: POSTS_LIMIT, skip: POSTS_LIMIT * (page - 1) })
    .map((post) => {
      const author = db.user.findFirst({
        where: {
          id: {
            equals: post.authorId,
          },
        },
      });
      return {
        ...post,
        author: author ? sanitizeUser(author) : undefined,
      };
    });
  const total = posts.length;
  const totalPages = Math.ceil(total / POSTS_LIMIT);

  res.json({
    posts,
    page,
    total,
    totalPages,
  });
})

router.get('/api/posts/:id', async (req, res) => {
  const post = db.post.findFirst({
    where: {
      id: {
        equals: req.params.id,
      },
    },
  });

  if (!post) {
    res.status(404).json({ message: "Not found." });
    return;
  }

  const author = db.user.findFirst({
    where: {
      id: {
        equals: post.authorId,
      },
    },
  });

  if (post.public) {
    res.json({ ...post, author: author ? sanitizeUser(author) : undefined });

  } else {
    // 非公開の投稿は投稿したユーザーのみ取得可能
    const { user } = await requireAuth(req.cookies);
    if (!user || post.authorId !== user.id) {
      res.status(404).json({ message: "Not found." });

    }else {
      res.json({ ...post, author: author ? sanitizeUser(author) : undefined });
    }
  }
})

router.post('/api/posts', async (req, res) => {
  const userObject = req.body;
  const existingUser = db.user.findFirst({
    where: {
      email: {
        equals: userObject.email,
      },
    },
  });

  if (existingUser) {
    res.status(400).json({ message: 'The email is already in use.' });
    return;
  }

  const role = UserRole.USER;
  db.user.create({
    ...userObject,
    role,
    password: hash(userObject.password),
  });
  await persistDb('user');

  res.json({ ...userObject, role });
})

router.post('/api/posts/:id', async (req, res) => {
  const { user, error } = await requireAuth(req.cookies);
  if (!user) {
    res.status(401).json({ message: error });
    return;
  }

  const data = req.body;
  const id = req.params.id as string;
  const updated = db.post.update({
    where: { id: { equals: id } },
    data,
  });
  await persistDb('post');
  res.json(updated);
})

router.delete('/api/posts/:id', async (req, res) => {
  const id = req.params.id;
  const post = db.post.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  });

  if(!post){
    res.status(404).json({ message: "Post not found." });
    return;
  }

  const { user, error } = await requireAuth(req.cookies);
  if (!user) {
    res.status(401).json({ message: error });

  }else if(user.id !== post.authorId){
    res.status(401).json({ message: "Can't delete other's post." });

  }else{
    db.post.delete({ where: { id: { equals: id } } });
    await persistDb('post');
    res.json({message: "Success"});
  }
})


export default router
