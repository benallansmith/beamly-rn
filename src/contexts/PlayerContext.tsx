import React, { createContext, useContext, useEffect, useState } from "react";

import { Genre, PlaylistSummary, TrackSummary } from "../types/audius";
import { fetchAudiusPlaylists, fetchAudiusPlaylistTracks, getAudiusHost } from "../utils/audius";
import { getNextTrackRoute } from "../utils/utils.ts";
import { Sound } from "expo-av/build/Audio/Sound";
import { Audio } from "expo-av";

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
    getAudiusHost().then((response) => setHost(response));
  }, []);

  const fetchPlaylists = async () => {
    fetchAudiusPlaylists(selectedGenre).then(async (playlists) => {
      setPlaylist(playlists[0]);

      const tracks: TrackSummary[] = await fetchAudiusPlaylistTracks(playlists[0].id);
      setTrack(tracks[playlistIndex]);

      // const tracks = playlists[0].tracks;
      const trackIndex = 0;
      const tempNextTrackRoute = getNextTrackRoute(selectedGenre, playlists, 0, tracks, trackIndex);
      setNextTrackRoute(tempNextTrackRoute);

      const tempPreviousTrackRoute = getNextTrackRoute(
        selectedGenre,
        playlists,
        0,
        tracks,
        trackIndex
      );
      setPreviousTrackRoute(tempPreviousTrackRoute);
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
  const {
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
  } = useContext(PlayerContext);

  const [sound, setSound] = useState<Sound | null>(null);
  const [userClickedPlay, setUserClickedPlay] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isWaiting, setIsWaiting] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sliderValue, setSliderValue] = useState(0);
  const [audioLoading, setAudioLoading] = useState(false);

  // Initialize audio
  const initAudio = async () => {
    if (!host || !track?.id) return;

    setAudioLoading(true);
    const soundObject = await Audio.Sound.createAsync(
      { uri: `${host}/v1/tracks/${track.id}/stream` },
      { shouldPlay: false }
    );
    setAudioLoading(false);
    setSound(soundObject.sound);
  };

  // Play audio
  const play = async () => {
    if (!host || !track?.id) return;

    setUserClickedPlay(true);
    if (sound) {
      await sound.playAsync();
    }
  };

  // Pause audio
  const pause = async () => {
    if (!host || !track?.id) return;

    setUserClickedPlay(false);
    if (sound) {
      await sound.pauseAsync();
    }
  };

  // Next track in playlist
  //   const nextTrack = async () => {
  //       if (!host || !playlist || !track?.id) return;
  //
  //       const tracks = playlist.tracks;
  //       const nextIndex = (playlistIndex + 1) % tracks.length;
  //       setPlaylistIndex(nextIndex);
  //       setTrack(tracks[nextIndex]);
  //   };

  useEffect(() => {
    if (!host || !track?.id) return;

    initAudio();

    return () => {
      sound && sound.unloadAsync();
    };
  }, [track?.id]);

  return {
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
    setPreviousTrackRoute,
    userClickedPlay,
    isWaiting,
    sliderValue,
    play,
    pause,
    audioLoading
  };
};
