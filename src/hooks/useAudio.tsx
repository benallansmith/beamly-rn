import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio/Sound";

export const useAudio = (
  trackId?: unknown,
  autoplay?: any,
  host?: any,
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextTrackRoute: any
) => {
  const [sound, setSound] = useState<Sound | null>(null);
  const [userClickedPlay, setUserClickedPlay] = useState(autoplay);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isWaiting, setIsWaiting] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sliderValue, setSliderValue] = useState(0);

  // Initialize audio
  const initAudio = async () => {
    if (!host || !trackId) return;

    // console.log("Initializing audio", trackId, host, autoplay);
    //
    const soundObject = await Audio.Sound.createAsync(
      { uri: `${host}/v1/tracks/${trackId}/stream` },
      { shouldPlay: autoplay }
    );
    console.log("soundObject", soundObject);
    setSound(soundObject.sound);

    // Add listeners similar to the web version, adapted for the expo-av API
    // You'll need to manage the state changes based on the audio playback status
  };

  // Play audio
  const play = async () => {
    if (!host || !trackId) return;
    setUserClickedPlay(true);
    if (sound) {
      await sound.playAsync();
      // Start animation or any other UI update logic
    }
  };

  // Pause audio
  const pause = async () => {
    setUserClickedPlay(false);
    if (sound) {
      await sound.pauseAsync();
    }
  };

  // More methods like resetTrackProgress and skipToPoint adapted for React Native

  useEffect(() => {
    console.log("useAudio useEffect", trackId, host, autoplay);
    initAudio();

    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [trackId]);

  return {
    userClickedPlay,
    isWaiting,
    sliderValue,
    play,
    pause
    // Include other methods you adapt
  };
};
