import express from 'express';
import { db, persistDb } from '@/__mocks__/db';
import { hash, sanitizeUser } from '@/__mocks__/utils';
import { requireAuth } from '@/__mocks__/handlers/utils';

const router = express.Router()


router.post('/api/auth/login', async (req, res) => {
  const credentials = await req.body;
  const user = db.user.findFirst({
    where: {
      email: {
        equals: credentials.email,
      },
    },
  });

  if (user?.password === hash(credentials.password)) {
    res.json(sanitizeUser(user));
  }else{
    res.json();
  }
})


router.get('/api/auth/me', async (req, res) => {
  // todo next.js側でユーザーの検証をしてapi側を簡略化するか？
    const { user, error } = await requireAuth(req.cookies);
    if (error) {
      res.status(401).json({ message: error });
      return;
    }
    res.json(user);
})

router.patch('/api/auth/me', async (req, res) => {
    const { user, error } = await requireAuth(req.cookies);
    if (error) {
      res.status(401).json({ message: error });
      return;
    }
    const data = req.body;
    const result = db.user.update({
      where: {
        id: {
          equals: user?.id,
        },
      },
      data,
    });
    await persistDb('user');
    res.json(result);
})

router.post("/api/auth/reset-password", (req, res) => {
  res.json({});
})


export default router
