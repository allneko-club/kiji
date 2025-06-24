'use client';

import { SessionProvider } from 'next-auth/react';
import * as React from 'react';
import { ToastContainer } from 'react-toastify';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <SessionProvider>
      {children}
      <ToastContainer autoClose={2000} />
    </SessionProvider>
  );
};
