import ContactForm from '@/app/(misc)/contact/_components/cocntact-form';
import type { Metadata } from 'next';
import Container from '@mui/material/Container';

export const metadata: Metadata = { title: "お問い合わせ" };

export default function Page() {
  return (
      <Container
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <ContactForm />
      </Container>
  );
};
