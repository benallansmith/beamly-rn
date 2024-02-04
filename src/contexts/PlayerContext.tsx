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
  tracks: TrackSummary[];
  setTracks: (tracks: TrackSummary[]) => void;
  track: TrackSummary | null;
  setTrack: (track: TrackSummary) => void;
  nextTrackRoute: string;
  setNextTrackRoute: (route: string) => void;
  previousTrackRoute: string;
  setPreviousTrackRoute: (route: string) => void;
  sound: Sound | null;
  setSound: (sound: Sound) => void;
  isLoaded: boolean;
  setIsLoaded: (isLoaded: boolean) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
  trackLength: number;
  setTrackLength: (trackLength: number) => void;
  trackPosition: number;
  setTrackPosition: (trackPosition: number) => void;
  sliderValue: number;
  setSliderValue: (sliderValue: number) => void;
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
  tracks: [],
  setTracks: () => {},
  track: null,
  setTrack: () => {},
  nextTrackRoute: "",
  setNextTrackRoute: () => {},
  previousTrackRoute: "",
  setPreviousTrackRoute: () => {},
  sound: null,
  setSound: () => {},
  isLoaded: false,
  setIsLoaded: () => {},
  isPlaying: false,
  setIsPlaying: () => {},
  isPaused: false,
  setIsPaused: () => {},
  trackLength: 0,
  setTrackLength: () => {},
  trackPosition: 0,
  setTrackPosition: () => {},
  sliderValue: 0,
  setSliderValue: () => {}
});

// Provider component
export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [host, setHost] = useState<string>("");
  const [playlist, setPlaylist] = useState<PlaylistSummary | null>(null);
  const [track, setTrack] = useState<TrackSummary | null>(null);
  const [tracks, setTracks] = useState<TrackSummary[]>([]);
  const [nextTrackRoute, setNextTrackRoute] = useState<string>("");
  const [previousTrackRoute, setPreviousTrackRoute] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<Genre>("lo-fi");
  const [playlistIndex, setPlaylistIndex] = useState<number>(0);

  const [sound, setSound] = useState<Sound | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [trackLength, setTrackLength] = useState(0);
  const [trackPosition, setTrackPosition] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    getAudiusHost().then((response) => setHost(response));
  }, []);

  const fetchPlaylists = async () => {
    fetchAudiusPlaylists(selectedGenre).then(async (playlists) => {
      const tempPlaylistIndex = 0;
      setPlaylistIndex(tempPlaylistIndex);

      const tempPlaylist = playlists[0];
      setPlaylist(tempPlaylist);

      const tempTracks: TrackSummary[] = await fetchAudiusPlaylistTracks(tempPlaylist.id);
      setTracks(tempTracks);

      const tempTrack = tempTracks[tempPlaylistIndex];
      setTrack(tempTrack);

      const tempNextTrackRoute = getNextTrackRoute(selectedGenre, playlists, 0, tempTracks, 0);
      setNextTrackRoute(tempNextTrackRoute);

      const tempPreviousTrackRoute = getNextTrackRoute(selectedGenre, playlists, 0, tempTracks, 0);
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
        tracks,
        setTracks,
        track,
        setTrack,
        nextTrackRoute,
        setNextTrackRoute,
        previousTrackRoute,
        setPreviousTrackRoute,
        sound,
        setSound,
        isLoaded,
        setIsLoaded,
        isPlaying,
        setIsPlaying,
        isPaused,
        setIsPaused,
        trackLength,
        setTrackLength,
        trackPosition,
        setTrackPosition,
        sliderValue,
        setSliderValue
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
    tracks,
    track,
    setTrack,
    nextTrackRoute,
    setNextTrackRoute,
    previousTrackRoute,
    setPreviousTrackRoute,
    sound,
    setSound,
    isLoaded,
    setIsLoaded,
    isPlaying,
    setIsPlaying,
    isPaused,
    setIsPaused,
    trackLength,
    setTrackLength,
    trackPosition,
    setTrackPosition,
    sliderValue,
    setSliderValue
  } = useContext(PlayerContext);

  // Initialize audio
  const createAudioObject = async () => {
    if (!host || !track?.id) return;

    setIsLoaded(false);
    setIsPlaying(true);
    if (sound) {
      await sound.pauseAsync();
      await sound.unloadAsync();
    }

    const audioObject = await Audio.Sound.createAsync(
      { uri: `${host}/v1/tracks/${track.id}/stream` },
      { shouldPlay: isPaused }
    );

    const tempStatus = await audioObject.sound.getStatusAsync();
    // @ts-ignore
    const tempTrackLength = tempStatus.durationMillis;
    setTrackLength(tempTrackLength);

    audioObject.sound.setOnPlaybackStatusUpdate((status) => {
      setIsLoaded(status.isLoaded);
      // @ts-ignore
      setIsPlaying(isPaused ? false : status.isPlaying);

      // @ts-ignore
      if (status?.positionMillis) {
        // @ts-ignore
        const tempPosition = status.positionMillis;
        setTrackPosition(tempPosition);

        const currentPercentage = Number(((tempPosition / tempTrackLength) * 100).toFixed(1));
        console.log("Current percentage", currentPercentage);
        if (
          currentPercentage !== sliderValue &&
          currentPercentage >= 0 &&
          currentPercentage <= 100
        ) {
          setSliderValue(currentPercentage);
        }
      }
    });

    setSound(audioObject.sound);
  };

  const setPosition = async (percentage: number) => {
    if (percentage < 0 || percentage > 100 || !isLoaded) return;

    const position = (percentage / 100) * trackLength;
    console.log("setPosition", position);
    // if (sound) await sound.setPositionAsync(position);
  };

  // Play audio
  const play = async () => {
    setIsPaused(false);
    if (sound) await sound.playAsync();
  };

  // Pause audio
  const pause = async () => {
    setIsPaused(true);
    if (sound) await sound.pauseAsync();
  };

  const nextTrack = async () => {
    if (!tracks.length) return;

    const tempPlaylistIndex = playlistIndex + 1;
    setPlaylistIndex(tempPlaylistIndex);

    setTrack(tracks[tempPlaylistIndex]);
  };

  const prevTrack = async () => {
    if (!tracks.length) return;

    // Calculate the new index, wrapping around to the last track if necessary
    const tempPlaylistIndex = (playlistIndex - 1 + tracks.length) % tracks.length;

    // Update the playlist index with the new value
    setPlaylistIndex(tempPlaylistIndex);

    // Update the current track based on the new playlist index
    setTrack(tracks[tempPlaylistIndex]);
  };

  useEffect(() => {
    if (!host || !track?.id) return;

    createAudioObject();

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
    isLoaded,
    isPlaying,
    sliderValue,
    setPosition,
    play,
    pause,
    nextTrack,
    trackPosition,
    prevTrack
  };
};
