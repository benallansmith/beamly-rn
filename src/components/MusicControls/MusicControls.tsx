import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@contexts/ThemeContext";
import { usePlayer } from "@contexts/PlayerContext";
import Slider from "@react-native-community/slider";

export const MusicControls = () => {
  const { isDarkMode } = useTheme();
  const { play, pause, prevTrack, nextTrack, isPlaying, isLoaded, sliderValue } = usePlayer();
  const textStyle = isDarkMode ? "text-white" : "text-black";
  const sliderMinTrackColor = isDarkMode ? "#EAEAEA" : "#EAEAEA";
  const sliderMaxTrackColor = isDarkMode ? "#000000" : "#000000";

  if (!isLoaded) {
    return (
      <View className="flex-row justify-between items-center mt-4">
        <Text className={`text-2xl ${textStyle}`}>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <View className="flex-row justify-between items-center mt-4 mb-4">
        <TouchableOpacity onPress={() => prevTrack()}>
          <Text className={`text-2xl ${textStyle}`}>««</Text>
        </TouchableOpacity>
        {isPlaying ? (
          <TouchableOpacity onPress={() => pause()}>
            <Text className={`text-3xl ${textStyle}`}>=</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => play()}>
            <Text className={`text-3xl ${textStyle}`}>▶</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => nextTrack()}>
          <Text className={`text-2xl ${textStyle}`}>»»</Text>
        </TouchableOpacity>
      </View>

      <Slider
        className={"w-full h-24"}
        minimumValue={0}
        maximumValue={100}
        step={0.1}
        value={sliderValue}
        onValueChange={(value) => console.log(value)}
        minimumTrackTintColor={sliderMinTrackColor}
        maximumTrackTintColor={sliderMaxTrackColor}
      />
    </>
  );
};
