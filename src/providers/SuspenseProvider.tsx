'use client';
import Loading from '@/components/Loading';
import { Suspense } from 'react';
export default function SuspenseProvider({
  children,
}: React.PropsWithChildren) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
