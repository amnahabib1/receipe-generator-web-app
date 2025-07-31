'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, [router]);

  return <p className="p-6 text-center">Redirecting to login page...</p>;
}
