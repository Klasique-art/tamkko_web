import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SharePage from "./share-page";
import { fetchSharePost } from "@/lib/share-api";
import { TAMKKO_FALLBACK_IMAGE } from "@/lib/share-constants";

interface Props {
  params: Promise<{ postId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { postId } = await params;
  const share = await fetchSharePost(postId);

  if (!share) {
    return {
      title: "Post unavailable | Tamkko",
      description: "This post is no longer available on Tamkko.",
    };
  }

  const canonicalUrl = `https://tamkko.com/post/${postId}`;
  const imageUrl = share.preview_image_url || TAMKKO_FALLBACK_IMAGE;
  const title = `${share.creator.display_name} (@${share.creator.username}) on Tamkko`;
  const description = share.caption || `Watch this post by @${share.creator.username} on Tamkko`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: description,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    other: {
      "og:site_name": "Tamkko",
    },
  };
}

export default async function PostSharePage({ params }: Props) {
  const { postId } = await params;
  const share = await fetchSharePost(postId);

  if (!share) {
    notFound();
  }

  return <SharePage share={share} />;
}
