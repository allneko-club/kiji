import express from 'express';
import { hash, sanitizeUser } from '@/__mocks__/utils';
import { requireAuth } from '@/__mocks__/handlers/utils';
import { prisma } from '@/__mocks__/prisma';

const router = express.Router()


router.post('/api/auth/login', async (req, res) => {
  const credentials = await req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: credentials.email,
    }
  })


  if (user?.password === hash(credentials.password)) {
    res.json(sanitizeUser(user));
  }else{
    res.json();
  }
})


router.get('/api/auth/me', async (req, res) => {
    const { user, error } = await requireAuth(req.cookies);
    if (error) {
      res.status(401).json({ message: error });
      return;
    }
    res.json(user);
})

router.patch('/api/auth/me', async (req, res) => {
    const { user, error } = await requireAuth(req.cookies);
    if (!user) {
      res.status(401).json({ message: error });
      return;
    }
    const data = req.body;
    const result = await prisma.user.update({
      where: {
        id: Number(user.id),
      },
      data,
    });
    res.json(result);
})

router.post("/api/auth/reset-password", (req, res) => {
  res.json({message: "Sent password reset email."});
})


export default router
