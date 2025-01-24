import express from 'express';
import { requireAuth } from '@/express/handlers/utils';
import { prisma } from '@/express/prisma';

const router = express.Router()

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
