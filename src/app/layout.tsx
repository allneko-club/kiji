import { auth } from '@/auth';
import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';
import { SITE_DESCRIPTION, SITE_NAME, WEBAPP_URL } from '@/lib/consts';
import theme from '@/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import * as React from 'react';
import { ToastContainer } from 'react-toastify';

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(WEBAPP_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    robots: { index: true, follow: true },
    twitter: {
      title: SITE_NAME,
      images: ['/site-image.png'],
      card: 'summary_large_image',
      description: SITE_DESCRIPTION,
    },
    generator: SITE_NAME,
    publisher: SITE_NAME,
    abstract: SITE_DESCRIPTION,
    openGraph: {
      url: WEBAPP_URL,
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      siteName: SITE_NAME,
      images: ['/site-image.png'],
    },
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  const user = session?.user;
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider>
          <SessionProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline enableColorScheme />
              <Header logInUser={user ? { name: user.name, email: user.email, image: user.image } : null} />
              <Container
                maxWidth="lg"
                component="main"
                sx={{ display: 'flex', flexDirection: 'column', py: 4, gap: 4 }}>
                {children}
              </Container>
              <Footer />
            </ThemeProvider>
            <ToastContainer autoClose={2000} />
          </SessionProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
