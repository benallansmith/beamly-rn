import React from "react";
import { View } from "react-native";
import { useTheme } from "@contexts/ThemeContext";
import MusicControls from "@components/MusicControls";
import MusicCard from "@components/MusicCard";
import Dropdown from "@components/Dropdown";
import DebugInfo from "@components/DebugInfo";

const genres = ["Lo-Fi", "Instrumental", "Ambient", "Classical", "House"];

export const MusicPlayer = () => {
  const { isDarkMode } = useTheme();

  const containerStyle = isDarkMode ? "bg-gray-900" : "bg-white";
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-300";

  return (
    <View className="pt-12">
      <View className={`rounded-lg border p-4 m-4 ${containerStyle} ${borderColor}`}>
        <View className={`pb-4 mb-4 ${borderColor}`}>
          <Dropdown options={genres} />
        </View>
        <MusicCard />
        <MusicControls />
        <DebugInfo />
      </View>
    </View>
  );
};
