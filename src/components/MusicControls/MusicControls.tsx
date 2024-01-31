import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@contexts/ThemeContext";

export const MusicControls = () => {
  const { isDarkMode } = useTheme();
  const textStyle = isDarkMode ? "text-white" : "text-black";

  return (
    <View className="flex-row justify-between items-center mt-4">
      <TouchableOpacity>
        <Text className={`text-2xl ${textStyle}`}>««</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text className={`text-3xl ${textStyle}`}>▶</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text className={`text-2xl ${textStyle}`}>»»</Text>
      </TouchableOpacity>
    </View>
  );
};
