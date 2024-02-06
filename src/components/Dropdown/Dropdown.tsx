import React, { useState } from "react";
import { View } from "react-native";
import { Genre } from "../../types";
import DropDownPicker from "react-native-dropdown-picker";

const customDark = require("../../theme/Dropdown/themes/custom-dark");
const customLight = require("../../theme/Dropdown/themes/custom-light");
DropDownPicker.addTheme("custom-dark", customDark);
DropDownPicker.addTheme("custom-light", customLight);

const Dropdown = ({
  theme,
  selectedGenre,
  setSelectedGenre
}: {
  theme: "custom-dark" | "custom-light";
  selectedGenre: Genre;
  setSelectedGenre: (genre: Genre) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedGenre);
  const [items, setItems] = useState([
    { label: "Lo-Fi", value: "lo-fi" },
    { label: "Instrumental", value: "instrumental" },
    { label: "Ambient", value: "ambient" },
    { label: "Classical", value: "classical" },
    { label: "House", value: "house" }
  ]);

  const handleSelect = (option: string) => {
    setSelectedGenre(option as Genre);
    setValue(option as Genre);
  };

  return (
    <View className="w-36 z-10 mb-4">
      <DropDownPicker
        // @ts-ignore
        theme={theme}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        // @ts-ignore
        setValue={handleSelect}
        setItems={setItems}
      />
    </View>
  );
};

export default Dropdown;
