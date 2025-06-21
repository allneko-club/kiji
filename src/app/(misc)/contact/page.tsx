import ContactForm from '@/app/(misc)/contact/_components/cocntact-form';
import Container from '@mui/material/Container';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'お問い合わせ' };

export default function Page() {
  return (
    <Container>
      <ContactForm />
    </Container>
  );
}
