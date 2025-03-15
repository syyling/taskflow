import { QueryErrorResetBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import FallbackErrorUI from '@/components/FallbacKErrorUI.tsx';
import Spinner from '@/components/Spinner.tsx';

export default function ApiQueryWrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={FallbackErrorUI}>
          <Suspense fallback={<Spinner />}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
