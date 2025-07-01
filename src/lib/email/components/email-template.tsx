import { WEBAPP_URL } from '@/lib/consts';
import { Body, Container, Html, Img, Link, Section } from '@react-email/components';
import React from 'react';

interface EmailTemplateProps {
  readonly children: React.ReactNode;
}

export async function EmailTemplate({ children }: EmailTemplateProps): Promise<React.JSX.Element> {
  return (
    <Html>
      <Body
        style={{
          fontFamily: "'Jost', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'sans-serif'",
        }}>
        <Section>
          <Link href={WEBAPP_URL} target="_blank">
            <Img data-testid="default-logo-image" alt="Logo" src={`${WEBAPP_URL}/logo.svg`} />
          </Link>
        </Section>
        <Container>{children}</Container>
      </Body>
    </Html>
  );
}
