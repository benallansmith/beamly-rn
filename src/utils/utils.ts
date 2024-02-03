// import { type ClassValue, clsx } from "clsx";
// import { twMerge } from "tailwind-merge";
import { z } from "zod";

import { Genre, GenreSchema, PlaylistSummary, TrackSummary } from "../types/audius";

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

export function toTitleCase(input: string): string {
  return input.replace(/\b\w/g, (char) => char.toUpperCase());
}

export async function retry<T>(
  func: () => Promise<T>,
  maxRetries: number = 5,
  attemptCount: number = 0
): Promise<T> {
  try {
    return await func();
  } catch (error) {
    console.error(`Error in function call (retry ${attemptCount + 1} of ${maxRetries}):`, error);

    if (attemptCount < maxRetries - 1) {
      return retry(func, maxRetries, attemptCount + 1);
    } else {
      throw new Error(`Max retries (${maxRetries}) reached. Unable to complete the function call.`);
    }
  }
}

export function parseGenre(value: string): Genre {
  const parsed = GenreSchema.safeParse(value);
  return parsed.success ? parsed.data : "lo-fi";
}

export function parseIndex(index: number | string, list: any[]): number {
  const IndexSchema = z.coerce.number().int().nonnegative().lt(list.length);
  const parsed = IndexSchema.safeParse(index);
  return parsed.success ? parsed.data : 0;
}

export function parsePlaylistIndex(value: string, playlists: PlaylistSummary[]): number {
  return parseIndex(
    playlists.findIndex((item) => item.playlist_name_formatted === value),
    playlists
  );
}

export function truncateString(value?: string, maxLength?: number): string {
  if (!value || !maxLength) return "";
  if (value.length <= maxLength) {
    return value;
  }

  // Find the last space within the maxLength - 3 range (this caters for the elipsis at the end)
  const lastSpaceIndex = value.lastIndexOf(" ", maxLength - 3);

  // If no space found, truncate at maxLength - 3
  const truncated =
    lastSpaceIndex === -1 ? value.slice(0, maxLength - 3) : value.slice(0, lastSpaceIndex);

  return `${truncated}...`;
}

export function getNextIndex(list: any[], currentIndex: number) {
  return parseIndex(currentIndex + 1, list);
}

export function getPreviousIndex(list: any[], currentIndex: number) {
  return parseIndex(currentIndex - 1, list);
}

export function getNextTrackRoute(
  genre: Genre,
  playlists: PlaylistSummary[],
  playlistIndex: number,
  tracks: TrackSummary[],
  trackIndex: number
): string {
  const nextTrackIndex = getNextIndex(tracks, trackIndex);

  const nextTrackPlaylistIndex =
    nextTrackIndex === 0 ? getNextIndex(playlists, playlistIndex) : playlistIndex;

  return `/${genre}/${playlists[nextTrackPlaylistIndex].playlist_name_formatted}/${nextTrackIndex}`;
}

// This function should be updated to allow going back to the end of the previous playlist, instead of the start
export function getPreviousTrackRoute(
  genre: Genre,
  playlists: PlaylistSummary[],
  playlistIndex: number,
  tracks: TrackSummary[],
  trackIndex: number
): string {
  const previousTrackIndex = getPreviousIndex(tracks, trackIndex);

  const previousTrackPlaylistIndex =
    trackIndex === 0 ? getPreviousIndex(playlists, playlistIndex) : playlistIndex;

  return `/${genre}/${playlists[previousTrackPlaylistIndex].playlist_name_formatted}/${previousTrackIndex}`;
}

export function formatStringForUrl(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}
