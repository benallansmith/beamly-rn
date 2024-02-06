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
    isPlaying,
    isLoaded,
    sliderValue,
    selectedGenre,
    setSelectedGenre
  } = player;

  const containerStyle = isDarkMode ? "bg-zinc-900" : "bg-white";
  const borderColor = isDarkMode ? "border-slate-700" : "border-slate-300";

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
          isPlaying={isPlaying}
          isLoaded={isLoaded}
          sliderValue={sliderValue}
        />
        <DebugInfo player={player} />
      </View>
    </View>
  );
};

export default MusicPlayer;
