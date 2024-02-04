import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@contexts/ThemeContext";
import { usePlayer } from "@contexts/PlayerContext";

export const MusicControls = () => {
  const { isDarkMode } = useTheme();
  const { userClickedPlay, play, pause } = usePlayer();
  const textStyle = isDarkMode ? "text-white" : "text-black";

  return (
    <View className="flex-row justify-between items-center mt-4">
      <TouchableOpacity>
        <Text className={`text-2xl ${textStyle}`}>««</Text>
      </TouchableOpacity>
      {userClickedPlay ? (
        <TouchableOpacity onPress={() => pause()}>
          <Text className={`text-3xl ${textStyle}`}>=</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => play()}>
          <Text className={`text-3xl ${textStyle}`}>▶</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity>
        <Text className={`text-2xl ${textStyle}`}>»»</Text>
      </TouchableOpacity>
    </View>
  );
};
