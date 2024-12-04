import { ReactNode } from 'react';
import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { AppProvider } from '@/app/provider';
import { getUserQueryOptions } from '@/lib/auth';
import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';
import "@/styles/globals.css";


export const metadata: Metadata = {
  title: "Kiji",
  description: "Next.jsで作成したCMSアプリケーション",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getUserQueryOptions());

  const dehydratedState = dehydrate(queryClient);
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
      <AppProvider>
        <HydrationBoundary state={dehydratedState}>
          <div className="flex h-full min-h-screen w-full flex-col justify-between">
            <Header />
            <main className="w-full flex-auto px-4 py-4 sm:px-6 md:py-6">
              {children}
            </main>
            <Footer />
          </div>
        </HydrationBoundary>
      </AppProvider>
      </body>
    </html>
);
}

export default RootLayout;

// We are not prerendering anything because the app is highly dynamic
// and the data depends on the user so we need to send cookies with each request
export const dynamic = 'force-dynamic';