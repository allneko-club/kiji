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

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <AppProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex h-full min-h-screen w-full flex-col justify-between">
              <Header />
              <main className="w-full flex-auto px-4 py-4 sm:px-6 md:py-6">
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

export default RootLayout;

// We are not prerendering anything because the app is highly dynamic
// and the data depends on the user so we need to send cookies with each request
export const dynamic = 'force-dynamic';