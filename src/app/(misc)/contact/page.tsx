import ContactForm from '@/app/(misc)/contact/_components/cocntact-form';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'お問い合わせ' };

export default function Page() {
  return (
    <>
      <Typography variant="h1">お問い合わせ</Typography>
      <Typography>以下のフォームに入力してください。</Typography>
      <ContactForm />
    </>
  );
}
