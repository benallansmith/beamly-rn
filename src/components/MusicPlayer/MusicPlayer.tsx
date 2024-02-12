import React from "react";
import { View } from "react-native";
import { useTheme } from "@contexts/ThemeContext";
import MusicControls from "@components/MusicControls";
import MusicCard from "@components/MusicCard";
import Dropdown from "@components/Dropdown";
import DebugInfo from "@components/DebugInfo";
import { usePlayer } from "@contexts/PlayerContext.tsx";

const MusicPlayer = () => {
  const { isDarkMode } = useTheme();
  const player = usePlayer();
  const {
    play,
    pause,
    prevTrack,
    nextTrack,
    isPaused,
    isLoaded,
    sliderValue,
    selectedGenre,
    setSelectedGenre,
    debouncedSetPosition
  } = player;

  const containerStyle = isDarkMode ? "bg-zinc-900" : "bg-white";
  const borderColor = isDarkMode ? "border-zinc-700" : "border-zinc-300";

  return (
    <View className="pt-12">
      <View className={`rounded-lg border p-4 m-4 ${containerStyle} ${borderColor}`}>
        <Dropdown
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          theme={isDarkMode ? "custom-dark" : "custom-light"}
        />
        <MusicCard track={player.track} />
        <MusicControls
          play={play}
          pause={pause}
          prevTrack={prevTrack}
          nextTrack={nextTrack}
          isPaused={isPaused}
          isLoaded={isLoaded}
          sliderValue={sliderValue}
          setPosition={debouncedSetPosition}
        />
        <DebugInfo player={player} />
      </View>
    </View>
  );
};

export default MusicPlayer;
