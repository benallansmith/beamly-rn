import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Menu } from "react-native-paper";
import { usePlayer } from "@contexts/PlayerContext.tsx";

export const Dropdown = ({ options }: { options: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedGenre, setSelectedGenre } = usePlayer();

  const openMenu = () => setIsOpen(true);

  const closeMenu = () => setIsOpen(false);

  const handleSelect = (option: string) => {
    setSelectedGenre(option);
    closeMenu();
  };

  return (
    <View className="w-42">
      <Menu
        visible={isOpen}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu} className="w-42 bg-black p-2.5 rounded">
            <Text className="w-42 text-white text-center">{selectedGenre}</Text>
          </TouchableOpacity>
        }>
        <FlatList
          data={options}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <Menu.Item onPress={() => handleSelect(item)} title={item} />}
        />
      </Menu>
    </View>
  );
};
