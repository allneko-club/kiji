import { ReactNode } from 'react';
import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes';
import { AppProvider } from '@/app/provider';
import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';
import "@/styles/globals.css";


export const metadata: Metadata = {
  title: "Kiji",
  description: "Next.jsで作成したCMSアプリケーション",
};

export default async function RootLayout ({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <AppProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex h-full min-h-screen w-full flex-col justify-between">
              <Header />
              <main className="w-full flex-auto px-4 py-4 sm:px-6 md:py-6 bg-slate-100 dark:bg-black">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
