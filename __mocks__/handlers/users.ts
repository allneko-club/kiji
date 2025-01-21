import express from 'express';
import { UserRole } from '@/config/consts';
import { db, persistDb } from '@/__mocks__/db';
import { hash, sanitizeUser } from '@/__mocks__/utils';

const router = express.Router()

router.get('/api/users', (req, res) => {
  const result = db.user.findMany({}).map(sanitizeUser);
  res.json({ users: result, total: result.length });
})

router.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const user = db.user.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  });

  if (!user) {
    res.status(404).json({ message: "Not found." });
    return;
  }

  res.json(user);
})

router.post('/api/users', async (req, res) => {
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

export default router
