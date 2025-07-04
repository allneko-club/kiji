import EmailButton from '@/lib/email/components/email-button';
import { paths } from '@/lib/paths';
import { Container, Heading, Text } from '@react-email/components';
import React from 'react';
import { EmailFooter } from '../../components/email-footer';
import { EmailTemplate } from '../../components/email-template';

export async function RegisteredEmail(): Promise<React.JSX.Element> {
  return (
    <EmailTemplate>
      <Container>
        <Heading>{'アカウント登録完了'}</Heading>
        <Text>{'アカウントを登録しました。'}</Text>
        <EmailButton label="ログインする。" href={paths.auth.login.getHref()} />
        <EmailFooter />
      </Container>
    </EmailTemplate>
  );
}

export default RegisteredEmail;
