import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { AppProvider } from '@/app/provider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'Kiji',
  description: 'Next.jsで作成したCMSアプリケーション',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  const user = session?.user
  return (
    <html lang="ja" suppressHydrationWarning>
    <body>
    <AppRouterCacheProvider>
      <AppProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <Header logInUser={user ? {name: user.name, email: user.email, image: user.image } : null} />
          <Container
            maxWidth="lg"
            component="main"
            sx={{ display: 'flex', flexDirection: 'column', py: 4, gap: 4 }}
          >
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
