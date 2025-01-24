import express from 'express';
import { Role } from '@/config/consts';
import { sanitizeUser } from '@/express/utils';
import { prisma } from '@/express/prisma';
import { hash } from '@/lib/utils';

const router = express.Router()

router.get('/api/users', async (req, res) => {
  const result = await prisma.user.findMany()
  res.json({ users: result.map(sanitizeUser), total: result.length });
})

router.get('/api/users/:id(\\d+)', async (req, res) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    }
  })

  if (!user) {
    res.sendStatus(404);
    return;
  }

  res.json(user);
})

router.post('/api/users', async (req, res) => {

  const userObject = req.body;
  const existingUser = await prisma.user.findUnique({
    where: {
      email: userObject.email,
    }
  })

  if (existingUser) {
    res.status(400).json({ message: 'The email is already in use.' });
    return;
  }

  const result = await prisma.user.create({
    data:{
      ...userObject,
      role: Role.USER,
      password: hash(userObject.password),
    }
  });

  res.json(sanitizeUser(result));
})

export default router
