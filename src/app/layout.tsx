import { AppProvider } from '@/app/provider';
import { auth } from '@/auth';
import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';
import theme from '@/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Kiji',
  description: 'Next.jsで作成したCMSアプリケーション',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  const user = session?.user;
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider>
          <AppProvider>
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
          </AppProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
