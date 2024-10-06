'use client';
import { useRouter } from 'next/navigation';
export default function Unathorized() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
      <div className="rounded-lg bg-white p-8 text-center shadow-xl">
        <h1 className="mb-4 text-4xl font-bold">403</h1>
        <p className="text-gray-600">
          Oops! The page you are unauthorized to access this page.
        </p>
        <a
          href="/"
          className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
          onClick={(e) => {
            router.push('/home');
            e.preventDefault();
          }}
        >
          {' '}
          Go back to Home{' '}
        </a>
      </div>
    </div>
  );
}
