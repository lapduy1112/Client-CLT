'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
export default function HomeRedirect() {
  useEffect(() => {
    redirect('/home');
  }, []);

  return null;
}
