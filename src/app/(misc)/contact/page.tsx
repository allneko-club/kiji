import ContactForm from '@/app/(misc)/contact/_components/cocntact-form';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: "お問い合わせ" };

export default function Page() {
  return (
    <div className="flex justify-center">
      <ContactForm />
    </div>
  );
};
