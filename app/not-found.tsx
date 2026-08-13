import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 text-center">
        <p className="font-mono text-sm text-emerald-400 mb-2">$ cd /not-found</p>
        <h1 className="text-6xl font-bold tracking-tight">404</h1>
        <p className="mt-3 text-muted-foreground">
          This page doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-medium text-black hover:bg-emerald-400"
        >
          Return Home
        </Link>
      </main>
      <Footer />
    </>
  );
}
