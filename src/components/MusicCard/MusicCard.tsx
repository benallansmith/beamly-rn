import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "@contexts/ThemeContext";
import { truncateString } from "../../utils/utils.ts";
import { usePlayer } from "@contexts/PlayerContext.tsx";

export const MusicCard = () => {
  const { isDarkMode } = useTheme();
  const textStyle = isDarkMode ? "text-white" : "text-black";
  const { track } = usePlayer();

  return (
    <View className={`p-6 rounded ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`}>
      <Text className={`font-bold ${textStyle}`}>{truncateString(track?.title, 30)}</Text>
      <Text className={`text-gray-400 ${textStyle}`}>{truncateString(track?.user?.name, 30)}</Text>
    </View>
  );
};
