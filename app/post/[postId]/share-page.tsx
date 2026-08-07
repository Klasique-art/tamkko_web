"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ExternalLink, Play, AlertTriangle } from "lucide-react";
import type { ShareData } from "@/lib/share-api";
import {
  TAMKKO_FALLBACK_IMAGE,
  GOOGLE_PLAY_URL,
  TESTFLIGHT_URL,
  APP_STORE_URL,
  formatDuration,
} from "@/lib/share-constants";

interface SharePageProps {
  share: ShareData;
}

export default function SharePage({ share }: SharePageProps) {
  const deepLinkUrl = `https://tamkko.com/post/${share.id}`;
  const imageUrl = share.preview_image_url || TAMKKO_FALLBACK_IMAGE;

  return (
    <div className="scaffold-shell">
      <div className="scaffold-frame">
        <header className="scaffold-nav">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-primary)] text-lg font-bold text-white">
              T
            </span>
            <span className="text-2xl text-stone-900 sm:text-3xl">Tamkko</span>
          </Link>
        </header>

        <main className="flex flex-1 flex-col items-center py-8">
          <article className="w-full max-w-lg">
            {share.is_mature && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>This post may contain mature content.</span>
              </div>
            )}

            <div className="scaffold-card">
              <div className="mb-4 flex items-center gap-3">
                {share.creator.avatar_url ? (
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-stone-200">
                    <Image
                      src={share.creator.avatar_url}
                      alt={share.creator.display_name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white">
                    {share.creator.display_name.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate font-semibold text-stone-900">
                      {share.creator.display_name}
                    </span>
                    {share.creator.is_verified && (
                      <CheckCircle className="h-4 w-4 shrink-0 text-blue-500" />
                    )}
                  </div>
                  <span className="text-sm text-stone-500">@{share.creator.username}</span>
                </div>
              </div>

              {share.caption && (
                <p className="mb-4 text-sm text-stone-700">{share.caption}</p>
              )}

              <div className="relative mb-4 overflow-hidden rounded-xl bg-stone-100">
                <div className="relative aspect-square w-full">
                  <Image
                    src={imageUrl}
                    alt={share.caption || `Post by ${share.creator.display_name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 512px"
                    className="object-cover"
                    priority
                  />
                </div>
                {share.media_type === "video" && (
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-md bg-black/70 px-2 py-1 text-xs text-white">
                    <Play className="h-3 w-3 fill-white" />
                    {share.duration_seconds ? formatDuration(share.duration_seconds) : "Video"}
                  </div>
                )}
              </div>

              {share.created_at && (
                <p className="mb-5 text-xs text-stone-400">
                  Posted {new Date(share.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              )}

              <a
                href={deepLinkUrl}
                className="mb-4 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-strong)]"
              >
                <ExternalLink className="h-4 w-4" />
                Open in Tamkko
              </a>

              <div className="space-y-3">
                <p className="text-center text-xs text-stone-500">
                  Don&apos;t have the app?
                </p>

                <a
                  href={GOOGLE_PLAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
                >
                  Get it on Google Play
                </a>

                {APP_STORE_URL ? (
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
                  >
                    Available on the App Store
                  </a>
                ) : TESTFLIGHT_URL ? (
                  <a
                    href={TESTFLIGHT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
                  >
                    Join TestFlight Beta
                  </a>
                ) : (
                  <div className="flex w-full items-center justify-center rounded-lg border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-400">
                    Tamkko for iOS &mdash; Coming Soon
                  </div>
                )}
              </div>
            </div>
          </article>
        </main>

        <footer className="border-t pt-5 text-center text-xs text-stone-400">
          <p>&copy; {new Date().getFullYear()} Tamkko. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
