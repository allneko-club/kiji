import express from 'express';

const router = express.Router()

router.post('/api/contact', (req, res) => {
  console.log(req.body)
  res.json({message: "success"})
})

export default router