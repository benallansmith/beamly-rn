import React, { createContext, useContext, useEffect, useRef, useState } from "react";

import { Genre, PlaylistSummary, TrackSummary } from "../types/audius";
import { fetchAudiusPlaylists, fetchAudiusPlaylistTracks, getAudiusHost } from "../utils/audius";
import { Sound } from "expo-av/build/Audio/Sound";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import _ from "lodash";

export type PlayerContextType = {
  host: string;
  setHost: (host: string) => void;
  selectedGenre: Genre;
  setSelectedGenre: (genre: Genre) => void;
  playlist: PlaylistSummary | null;
  setPlaylist: (playlist: PlaylistSummary) => void;
  playlistIndex: number;
  setPlaylistIndex: (index: number) => void;
  tracks: TrackSummary[];
  track: TrackSummary | null;
  setTrack: (track: TrackSummary) => void;
  sound: Sound | null;
  setSound: (sound: Sound | null) => void;
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
  resetMusicPlayer: () => void;
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
  track: null,
  setTrack: () => {},
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
  setSliderValue: () => {},
  resetMusicPlayer: () => {}
});

// Provider component
export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [host, setHost] = useState<string>("");
  const [playlist, setPlaylist] = useState<PlaylistSummary | null>(null);
  const [track, setTrack] = useState<TrackSummary | null>(null);
  const [tracks, setTracks] = useState<TrackSummary[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre>("lo-fi");
  const [playlistIndex, setPlaylistIndex] = useState<number>(0);

  const [sound, setSound] = useState<Sound | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [trackLength, setTrackLength] = useState(0);
  const [trackPosition, setTrackPosition] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);

  const resetMusicPlayer = async () => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }
    setIsLoaded(false);
    setSliderValue(0);
  };

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      playThroughEarpieceAndroid: false
    });

    getAudiusHost().then((response) => setHost(response));
  }, []);

  const fetchPlaylists = async () => {
    await resetMusicPlayer();
    setTrack(null);
    fetchAudiusPlaylists(selectedGenre).then(async (playlists) => {
      const tempPlaylistIndex = 0;
      setPlaylistIndex(tempPlaylistIndex);

      const tempPlaylist = playlists[0];
      setPlaylist(tempPlaylist);

      const tempTracks: TrackSummary[] = await fetchAudiusPlaylistTracks(tempPlaylist.id);
      setTracks(tempTracks);

      const tempTrack = tempTracks[tempPlaylistIndex];
      setTrack(tempTrack);
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
        track,
        setTrack,
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
        setSliderValue,
        resetMusicPlayer
      }}>
      {children}
    </PlayerContext.Provider>
  );
};

// Custom hook to use the genre context
export const usePlayer = () => {
  const {
    host,
    playlist,
    playlistIndex,
    setPlaylistIndex,
    tracks,
    track,
    setTrack,
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
    setSliderValue,
    resetMusicPlayer,
    ...context
  } = useContext(PlayerContext);

  const changingTrack = useRef(false);

  // Initialize audio
  const createAudioObject = async () => {
    if (!host || !track?.id) return;

    await resetMusicPlayer();

    const audioObject = await Audio.Sound.createAsync(
      { uri: `${host}/v1/tracks/${track.id}/stream` },
      { shouldPlay: !isPaused }
    );
    changingTrack.current = false;

    const tempStatus = await audioObject.sound.getStatusAsync();
    // @ts-ignore
    const tempTrackLength = tempStatus.durationMillis;
    setTrackLength(tempTrackLength);

    audioObject.sound.setOnPlaybackStatusUpdate((status) => {
      if (changingTrack.current) return;
      setIsLoaded(status.isLoaded);
      // @ts-ignore
      setIsPlaying(isPaused ? false : status.isPlaying);

      // @ts-ignore
      if (status?.positionMillis) {
        // @ts-ignore
        const tempPosition = status.positionMillis;
        setTrackPosition(tempPosition);

        const currentPercentage = Number(((tempPosition / tempTrackLength) * 100).toFixed(1));
        if (
          currentPercentage !== sliderValue &&
          currentPercentage >= 0 &&
          currentPercentage <= 100
        ) {
          setSliderValue(currentPercentage);
        }
      }

      // if (status?.isBuffering) {
      //
      // }

      // @ts-ignore
      if (status?.didJustFinish) {
        nextTrack();
      }
    });

    setSound(audioObject.sound);
  };

  const setPosition = async (percentage: number) => {
    if (percentage < 0 || percentage > 100 || !isLoaded) return;

    const position = Math.floor((percentage / 100) * trackLength);
    console.log("Setting position to", position);
    if (sound) await sound.setPositionAsync(position);
  };

  const debouncedSetPosition = _.debounce(setPosition, 250, {
    leading: true,
    trailing: false
  });

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

  const changeTrack = async (nextTrack: boolean) => {
    if (!tracks.length) return;
    // Set ref so any updates to setOnPlaybackStatusUpdate are ignored
    changingTrack.current = true;
    // Stop the current track
    await resetMusicPlayer();

    const tempPlaylistIndex = nextTrack
      ? playlistIndex + 1
      : (playlistIndex - 1 + tracks.length) % tracks.length;
    setPlaylistIndex(tempPlaylistIndex);
    setTrack(tracks[tempPlaylistIndex]);
  };

  const nextTrack = async () => await changeTrack(true);

  const prevTrack = async () => await changeTrack(false);

  useEffect(() => {
    if (!host || !track?.id) return;

    createAudioObject();

    return () => {
      sound && sound.unloadAsync();
    };
  }, [track?.id]);

  return {
    host,
    playlist,
    playlistIndex,
    setPlaylistIndex,
    track,
    setTrack,
    isLoaded,
    isPlaying,
    sliderValue,
    debouncedSetPosition,
    play,
    pause,
    nextTrack,
    trackPosition,
    prevTrack,
    ...context
  };
};
