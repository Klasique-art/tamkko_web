const TAMKKO_API_BASE = "https://api.tamkko.com";

export interface ShareCreator {
  username: string;
  display_name: string;
  avatar_url: string | null;
  is_verified: boolean;
}

export interface ShareData {
  id: string;
  canonical_url: string;
  creator: ShareCreator;
  caption: string;
  media_type: "video" | "image";
  preview_image_url: string | null;
  duration_seconds: number | null;
  is_mature: boolean;
  created_at: string | null;
}

export interface ShareResponse {
  status: "success" | "error";
  data: {
    share: ShareData;
  };
}

export async function fetchSharePost(postId: string): Promise<ShareData | null> {
  try {
    const res = await fetch(`${TAMKKO_API_BASE}/api/v1/share/post/${postId}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const json: ShareResponse = await res.json();
    return json.status === "success" ? json.data.share : null;
  } catch {
    return null;
  }
}
