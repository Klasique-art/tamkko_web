import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Post unavailable | Tamkko",
  description: "This post is no longer available on Tamkko.",
};

export default function PostNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary)]">
        <span className="text-2xl font-bold text-white">T</span>
      </div>
      <h1 className="font-serif text-3xl text-stone-900 sm:text-4xl">Post unavailable</h1>
      <p className="mt-3 max-w-md text-stone-600">
        This post may have been removed or the link is incorrect.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-strong)]"
      >
        Go to Tamkko
      </Link>
    </div>
  );
}
