import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { AppProvider } from '@/app/provider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';

import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});


export const metadata: Metadata = {
  title: 'Kiji',
  description: 'Next.jsで作成したCMSアプリケーション',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning className={roboto.variable}>
    <body>
    <AppRouterCacheProvider>
      <AppProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <Header />
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
