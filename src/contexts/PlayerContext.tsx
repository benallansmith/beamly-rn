import React, { createContext, useContext, useEffect, useState } from "react";

import { Genre, PlaylistSummary, TrackSummary } from "../types/audius";
import { fetchAudiusPlaylists, fetchAudiusPlaylistTracks, getAudiusHost } from "../utils/audius";
import { getNextTrackRoute } from "../utils/utils.ts";

type PlayerContextType = {
  host: string;
  setHost: (host: string) => void;
  selectedGenre: Genre;
  setSelectedGenre: (genre: Genre) => void;
  playlist: PlaylistSummary | null;
  setPlaylist: (playlist: PlaylistSummary) => void;
  playlistIndex: number;
  setPlaylistIndex: (index: number) => void;
  track: TrackSummary | null;
  setTrack: (track: TrackSummary) => void;
  nextTrackRoute: string;
  setNextTrackRoute: (route: string) => void;
  previousTrackRoute: string;
  setPreviousTrackRoute: (route: string) => void;
};

// Create a context for the genre selection
const PlayerContext = createContext<PlayerContextType>({
  host: "",
  setHost: () => {},
  selectedGenre: "lo-fi",
  setSelectedGenre: () => {},
  playlist: null,
  setPlaylist: () => {},
  playlistIndex: 0,
  setPlaylistIndex: () => {},
  track: null,
  setTrack: () => {},
  nextTrackRoute: "",
  setNextTrackRoute: () => {},
  previousTrackRoute: "",
  setPreviousTrackRoute: () => {}
});

// Provider component
export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [host, setHost] = useState<string>("");
  const [playlist, setPlaylist] = useState<PlaylistSummary | null>(null);
  const [track, setTrack] = useState<TrackSummary | null>(null);
  const [nextTrackRoute, setNextTrackRoute] = useState<string>("");
  const [previousTrackRoute, setPreviousTrackRoute] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<Genre>("lo-fi");
  const [playlistIndex, setPlaylistIndex] = useState<number>(0);

  useEffect(() => {
    console.log("Fetching host");
    getAudiusHost().then((response) => {
      console.log("Host response", response);
      setHost(response);
    });
  }, []);

  const fetchPlaylists = async () => {
    console.log("Fetching playlists");
    fetchAudiusPlaylists(selectedGenre).then(async (playlists) => {
      // console.log("Set playlists", playlists, playlists[0]);
      setPlaylist(playlists[0]);

      const tracks: TrackSummary[] = await fetchAudiusPlaylistTracks(playlists[0].id);
      console.log("Set track id", tracks[0].id);

      setTrack(tracks[playlistIndex]);

      // const tracks = playlists[0].tracks;
      const trackIndex = 0;
      const tempNextTrackRoute = getNextTrackRoute(selectedGenre, playlists, 0, tracks, trackIndex);
      console.log("Set next track route", tempNextTrackRoute);
      setNextTrackRoute(tempNextTrackRoute);

      const tempPreviousTrackRoute = getNextTrackRoute(
        selectedGenre,
        playlists,
        0,
        tracks,
        trackIndex
      );
      setPreviousTrackRoute(tempPreviousTrackRoute);
      console.log("Set previous track route", tempPreviousTrackRoute);

      // const tracks: TrackSummary[] = await fetchAudiusPlaylistTracks(
      //   playlists[playlistIndex].id,
      // );
      //
      // const trackIndex: number = parseIndex(trackIndexSlug, tracks);
      //
      // const nextTrackRoute = getNextTrackRoute(
      //   genre,
      //   playlists,
      //   playlistIndex,
      //   tracks,
      //   trackIndex,
      // );
      //
      // const previousTrackRoute = getPreviousTrackRoute(
      //   genre,
      //   playlists,
      //   playlistIndex,
      //   tracks,
      //   trackIndex,
      // );
    });
  };

  useEffect(() => {
    if (host && selectedGenre) {
      fetchPlaylists();
    }
  }, [host, selectedGenre]);

  return (
    <PlayerContext.Provider
      value={{
        host,
        setHost,
        selectedGenre,
        setSelectedGenre,
        playlist,
        setPlaylist,
        playlistIndex,
        setPlaylistIndex,
        track,
        setTrack,
        nextTrackRoute,
        setNextTrackRoute,
        previousTrackRoute,
        setPreviousTrackRoute
      }}>
      {children}
    </PlayerContext.Provider>
  );
};

// Custom hook to use the genre context
export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
