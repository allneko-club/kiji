import express from 'express';
const router = express.Router()

router.get('/healthcheck', (req, res) => {
  res.json({ ok: true });
})

export default router