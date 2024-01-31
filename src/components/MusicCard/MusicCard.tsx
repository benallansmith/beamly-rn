import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "@contexts/ThemeContext";

export const MusicCard = () => {
  const { isDarkMode } = useTheme();
  const textStyle = isDarkMode ? "text-white" : "text-black";

  return (
    <View
      style={{
        zIndex: 1
      }}
      className={`p-6 rounded ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`}>
      <Text className={`font-bold ${textStyle}`}>Cloudchord - Blue Gypsy...</Text>
      <Text className={`text-gray-400 ${textStyle}`}>College Music</Text>
    </View>
  );
};
