import { ReactNode } from 'react';
import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { AppProvider } from '@/app/provider';
import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';
import "@/styles/globals.css";

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
  title: "Kiji",
  description: "Next.jsで作成したCMSアプリケーション",
};

export default async function RootLayout ({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning className={roboto.variable}>
      <body>
        <AppRouterCacheProvider>
          <AppProvider>
            <ThemeProvider theme={theme}>
              <div className="flex h-full min-h-screen w-full flex-col justify-between">
                <Header />
                <main className="w-full flex-auto px-4 py-4 sm:px-6 md:py-6 bg-slate-100 dark:bg-black">
                  {children}
                </main>
                <Footer />
              </div>
            </ThemeProvider>
          </AppProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
