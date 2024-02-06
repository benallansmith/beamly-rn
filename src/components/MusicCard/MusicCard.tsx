import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "@contexts/ThemeContext";
import { TrackSummary } from "../../types";

const MusicCard = React.memo(({ track }: { track: TrackSummary | null }) => {
  const { isDarkMode } = useTheme();
  const textStyle = isDarkMode ? "text-white" : "text-black";

  const title = track?.title;
  const name = track?.user?.name;

  return (
    <View
      style={{ zIndex: 1 }}
      className={`z-1 p-6 rounded ${isDarkMode ? "bg-zinc-800" : "bg-zinc-200"}`}>
      <Text numberOfLines={1} className={`font-bold ${textStyle}`}>
        {title}
      </Text>
      <Text numberOfLines={1} className={`text-zinc-400 ${textStyle}`}>
        {name ? name : "Loading..."}
      </Text>
    </View>
  );
});

export default MusicCard;
