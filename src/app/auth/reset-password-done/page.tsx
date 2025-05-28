import type { Metadata } from 'next';
import Typography from '@mui/material/Typography';

export const metadata: Metadata = { title: "パスワードリセット申請完了" };

export default function Page() {
  return (
    <div>
      <Typography component="h1" variant="h3">パスワードをリセットするためのメールを送信しました</Typography>
      <Typography>メールを確認してパスワードをリセットしてください。</Typography>
    </div>
  );
};
