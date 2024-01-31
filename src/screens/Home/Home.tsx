import React from "react";
import { SafeAreaView } from "react-native";
import Header from "@components/Header";
import MusicPlayer from "@components/MusicPlayer";
import { useTheme } from "@contexts/ThemeContext";

export const Home = () => {
  const { isDarkMode } = useTheme();
  const containerStyle = isDarkMode ? "bg-gray-900" : "bg-white";

  return (
    <SafeAreaView className={`${containerStyle} h-full`}>
      <Header />
      <MusicPlayer />
    </SafeAreaView>
  );
};
