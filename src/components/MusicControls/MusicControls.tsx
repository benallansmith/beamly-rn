import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@contexts/ThemeContext";
import { useAudio } from "../../hooks/useAudio.tsx";
import { usePlayer } from "@contexts/PlayerContext";

export const MusicControls = () => {
  const { isDarkMode } = useTheme();
  const { host, track, nextTrackRoute } = usePlayer();
  const audio = useAudio(track?.id, false, host, nextTrackRoute);
  const textStyle = isDarkMode ? "text-white" : "text-black";

  return (
    <View className="flex-row justify-between items-center mt-4">
      <TouchableOpacity>
        <Text className={`text-2xl ${textStyle}`}>««</Text>
      </TouchableOpacity>
      {audio.userClickedPlay ? (
        <TouchableOpacity onPress={() => audio.pause()}>
          <Text className={`text-3xl ${textStyle}`}>=</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => audio.play()}>
          <Text className={`text-3xl ${textStyle}`}>▶</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity>
        <Text className={`text-2xl ${textStyle}`}>»»</Text>
      </TouchableOpacity>
    </View>
  );
};
