import React from "react";
import { View } from "react-native";
import MainLogo from "@components/MainLogo";
import ModeToggle from "@components/ModeToggle";

export const AudioPlayer = () => (
  <View className="border-b flex-row justify-between items-center">
    <View className="items-center px-2">
      <MainLogo />
    </View>
    <View className="items-start pr-4 ml-auto">
      <ModeToggle />
    </View>
  </View>
);
