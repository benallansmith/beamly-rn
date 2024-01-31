import React from "react";
import { View } from "react-native";
import MainLogo from "@components/MainLogo";
import ThemeToggle from "@components/ThemeToggle";
import { useTheme } from "@contexts/ThemeContext";

export const Header = () => {
  const { isDarkMode } = useTheme();
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-300";

  return (
    <View className={`border-b ${borderColor} h-20 flex-row justify-between items-center`}>
      <View className="items-center px-2">
        <MainLogo />
      </View>
      <View className="items-start pr-4 ml-auto">
        <ThemeToggle />
      </View>
    </View>
  );
};
