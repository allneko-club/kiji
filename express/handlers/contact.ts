import express from 'express';

const router = express.Router()

router.post('/api/contact', (req, res) => {
  console.log(req.body)
  // メールを送る処理

  res.json({message: "success"})
})

export default router