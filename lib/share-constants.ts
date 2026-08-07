export const TAMKKO_FALLBACK_IMAGE = "https://tamkko.com/og-image.png";

export const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.tamkko.app";

export const TESTFLIGHT_URL = null;

export const APP_STORE_URL = null;

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
