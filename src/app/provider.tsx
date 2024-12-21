'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { getQueryClient } from '@/lib/react-query';
import { MainErrorFallback } from '@/components/errors/main';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const queryClient = getQueryClient();

  return (
    <ErrorBoundary FallbackComponent={MainErrorFallback}>
      <QueryClientProvider client={queryClient}>
        {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
        {children}
        <ToastContainer autoClose={3000}/>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};