'use client';

import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

/**
 * App-wide providers wrapper
 * Includes theme provider and any other global providers
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
      <Toaster position="top-right" expand={true} richColors closeButton />
    </ThemeProvider>
  );
}
