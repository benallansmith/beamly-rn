import React from "react";
import { View } from "react-native";
import MainLogo from "../MainLogo";
import ModeToggle from "../ModeToggle";

export const Header = () => (
  <View className="border-b flex-row justify-between items-center">
    <View className="items-center px-2">
      <MainLogo />
    </View>
    <View className="items-start pr-4 ml-auto">
      <ModeToggle />
    </View>
  </View>
);
