'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { queryConfig } from '@/lib/react-query';
import { MainErrorFallback } from '@/components/errors/main';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      }),
  );

  return (
    <ErrorBoundary FallbackComponent={MainErrorFallback}>
      <QueryClientProvider client={queryClient}>
        {process.env.DEV && <ReactQueryDevtools />}
        {children}
        <ToastContainer autoClose={3000}/>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};