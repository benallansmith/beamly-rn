import { formatStringForUrl, retry } from "./utils";
import {
  Playlist,
  PlaylistResponse,
  PlaylistSummary,
  PlaylistTracksResponse,
  Track,
  TrackSummary
} from "../types/audius";

export async function getAudiusHost(): Promise<string> {
  try {
    const sample = (urls: string[]): string => urls[Math.floor(Math.random() * urls.length)];

    const response = await fetch("https://api.audius.co", {
      cache: "no-store"
    });
    if (!response.ok) {
      throw new Error("Failed to retrieve Audius host");
    }

    const data = await response.json();
    return sample(data.data);
  } catch (error) {
    console.error("Error getting Audius host:", error);
    throw new Error("Error getting Audius host");
  }
}

export async function fetchFromAudius(
  resource: string,
  params: Record<string, string> = {}
): Promise<any> {
  try {
    const host = await getAudiusHost();
    const apiVersion = "v1";

    const headers = {
      Accept: "application/json"
    };

    // Construct the query string from the params object
    const queryParams = new URLSearchParams(params).toString();

    // Combine the base URL, API version, resource, and query parameters
    const url = `${host}/${apiVersion}/${resource}?${queryParams}`;

    const response = await fetch(url, {
      method: "GET",
      headers: headers
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data from Audius host ${host}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching data from Audius: ", error);
    throw new Error("Error fetching data from Audius");
  }
}

async function retryFetchFromAudius(
  resource: string,
  params: Record<string, string> = {},
  maxRetries: number = 5
): Promise<any> {
  return await retry(() => fetchFromAudius(resource, params), maxRetries);
}

export async function fetchAudiusPlaylists(query: string): Promise<PlaylistSummary[]> {
  try {
    const response: PlaylistResponse = await retryFetchFromAudius("playlists/search", {
      query: query
    });

    const playlists = response.data
      //.filter((item: Playlist) => item.artwork["1000x1000"] !== "")
      .filter((item) => item.user.handle !== "musiccreatesus")
      .map((item: Playlist) => ({
        id: item.id,
        playlist_name: item.playlist_name,
        playlist_name_formatted: formatStringForUrl(item.playlist_name)
      }));

    return playlists;
  } catch (error) {
    console.error("Error fetching playlists:", error);
    throw new Error("Error fetching playlists");
  }
}

export async function fetchAudiusPlaylistTracks(playlistId: string): Promise<TrackSummary[]> {
  try {
    const response: PlaylistTracksResponse = await retryFetchFromAudius(
      `playlists/${playlistId}/tracks`
    );

    const tracks = response.data
      .filter((item: Track) => item.is_streamable)
      .map((item: Track) => ({
        id: item.id,
        title: item.title,
        user: item.user
      }));

    return tracks;
  } catch (error) {
    console.error("Error fetching playlist tracks:", error);
    throw new Error("Error fetching playlist tracks");
  }
}
