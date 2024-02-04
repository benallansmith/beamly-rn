import React from "react";
import { Text, View } from "react-native";
import { usePlayer } from "@contexts/PlayerContext.tsx";

export const DebugInfo = () => {
  const player = usePlayer();

  return (
    <View className="flex mt-8">
      <Text className="text-sm text-gray-500">Debug Info</Text>
      <Text className="text-xs text-gray-500">Host: {player.host}</Text>
      <Text className="text-xs text-gray-500">Track length: </Text>
      <Text className="text-xs text-gray-500">Track position: {player.trackPosition}ms</Text>
      <Text className="text-xs text-gray-500">
        Slider position: {player.sliderValue.toFixed(1)}%
      </Text>
      <Text className="text-xs text-gray-500">Is loaded: {player.isLoaded ? "true" : "false"}</Text>
      <Text className="text-xs text-gray-500">
        Is playing: {player.isPlaying ? "true" : "false"}
      </Text>
      <Text className="text-xs text-gray-500">Playlist: {JSON.stringify(player.playlist)}</Text>
    </View>
  );
};
