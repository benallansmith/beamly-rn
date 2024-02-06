import React from "react";
import { Text, View } from "react-native";

const DebugInfo = ({ player, isVisible }: { player: any; isVisible?: boolean }) => {
  if (!isVisible) return null;

  return (
    <View className="flex mt-8">
      <Text className="text-sm text-zinc-500">Debug Info</Text>
      <Text className="text-xs text-zinc-500">Host: {player.host}</Text>
      <Text className="text-xs text-zinc-500">Track length: </Text>
      <Text className="text-xs text-zinc-500">Track position: {player.trackPosition}ms</Text>
      <Text className="text-xs text-zinc-500">
        Slider position: {player.sliderValue.toFixed(1)}%
      </Text>
      <Text className="text-xs text-zinc-500">Is loaded: {player.isLoaded ? "true" : "false"}</Text>
      <Text className="text-xs text-zinc-500">
        Is playing: {player.isPlaying ? "true" : "false"}
      </Text>
      <Text className="text-xs text-zinc-500">Playlist: {JSON.stringify(player.playlist)}</Text>
    </View>
  );
};

export default DebugInfo;
