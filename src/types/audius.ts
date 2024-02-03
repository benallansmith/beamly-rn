import { z } from "zod";

export type Artwork = {
  "150x150": string;
  "480x480": string;
  "1000x1000": string;
};

export type CoverPhoto = {
  "640x": string;
  "2000x": string;
};

export type User = {
  album_count: number;
  artist_pick_track_id: string;
  bio: string;
  cover_photo: CoverPhoto;
  followee_count: number;
  follower_count: number;
  does_follow_current_user: boolean;
  handle: string;
  id: string;
  is_verified: boolean;
  location: string;
  name: string;
  playlist_count: number;
  profile_picture: Artwork;
  repost_count: number;
  track_count: number;
  is_deactivated: boolean;
  is_available: boolean;
  erc_wallet: string;
  spl_wallet: string;
  supporter_count: number;
  supporting_count: number;
  total_audio_balance: number;
};

export type Playlist = {
  artwork: Artwork;
  description: string;
  permalink: string;
  id: string;
  is_album: boolean;
  playlist_name: string;
  repost_count: number;
  favorite_count: number;
  total_play_count: number;
  user: User;
};

export type PlaylistResponse = {
  data: Playlist[];
};

export type PlaylistSummary = Pick<Playlist, "id" | "playlist_name"> & {
  playlist_name_formatted: string;
};

export type Track = {
  artwork: Artwork;
  description: string;
  genre: string;
  id: string;
  track_cid: string;
  mood: string;
  release_date: string;
  remix_of: {
    tracks: null | { parent_track_id: string }[];
  };
  repost_count: number;
  favorite_count: number;
  tags: string;
  title: string;
  user: User;
  duration: number;
  downloadable: boolean;
  play_count: number;
  permalink: string;
  is_streamable: boolean;
};

export type TrackSummary = Pick<Track, "id" | "title" | "user">;

export type PlaylistTracksResponse = {
  data: Track[];
};

export const GenreSchema = z.enum(["lo-fi", "instrumental", "ambient", "classical", "house"]);

export type Genre = z.infer<typeof GenreSchema>;
