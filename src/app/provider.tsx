'use client';

import { getQueryClient } from '@/lib/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import * as React from 'react';
import { ToastContainer } from 'react-toastify';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools buttonPosition="bottom-left" />}
        {children}
        <ToastContainer autoClose={2000} />
      </SessionProvider>
    </QueryClientProvider>
  );
};
