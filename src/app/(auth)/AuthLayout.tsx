import { ReactNode } from 'react';
import Image from 'next/image';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 relative">
        <Image
          src="/images/WavePattern.svg"
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="h-full w-full"
        />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
