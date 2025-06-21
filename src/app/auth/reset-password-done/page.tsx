import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'パスワードリセット申請完了' };

export default function Page() {
  return (
    <div>
      <Typography variant="h1">パスワードをリセットするためのメールを送信しました</Typography>
      <Typography>メールを確認してパスワードをリセットしてください。</Typography>
    </div>
  );
}
