import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "@contexts/ThemeContext";
import Slider from "@react-native-community/slider";
import { Path, Svg } from "react-native-svg";

const playButton =
  "M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z";
const pauseButton =
  "M6.04995 2.74998C6.04995 2.44623 5.80371 2.19998 5.49995 2.19998C5.19619 2.19998 4.94995 2.44623 4.94995 2.74998V12.25C4.94995 12.5537 5.19619 12.8 5.49995 12.8C5.80371 12.8 6.04995 12.5537 6.04995 12.25V2.74998ZM10.05 2.74998C10.05 2.44623 9.80371 2.19998 9.49995 2.19998C9.19619 2.19998 8.94995 2.44623 8.94995 2.74998V12.25C8.94995 12.5537 9.19619 12.8 9.49995 12.8C9.80371 12.8 10.05 12.5537 10.05 12.25V2.74998Z";
const nextButton =
  "M2.14645 11.1464C1.95118 11.3417 1.95118 11.6583 2.14645 11.8536C2.34171 12.0488 2.65829 12.0488 2.85355 11.8536L6.85355 7.85355C7.04882 7.65829 7.04882 7.34171 6.85355 7.14645L2.85355 3.14645C2.65829 2.95118 2.34171 2.95118 2.14645 3.14645C1.95118 3.34171 1.95118 3.65829 2.14645 3.85355L5.79289 7.5L2.14645 11.1464ZM8.14645 11.1464C7.95118 11.3417 7.95118 11.6583 8.14645 11.8536C8.34171 12.0488 8.65829 12.0488 8.85355 11.8536L12.8536 7.85355C13.0488 7.65829 13.0488 7.34171 12.8536 7.14645L8.85355 3.14645C8.65829 2.95118 8.34171 2.95118 8.14645 3.14645C7.95118 3.34171 7.95118 3.65829 8.14645 3.85355L11.7929 7.5L8.14645 11.1464Z";
const prevButton =
  "M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z";

const MusicControls = ({
  play,
  pause,
  prevTrack,
  nextTrack,
  isPlaying,
  isLoaded,
  sliderValue
}: {
  play: () => void;
  pause: () => void;
  prevTrack: () => void;
  nextTrack: () => void;
  isPlaying: boolean;
  isLoaded: boolean;
  sliderValue: number;
}) => {
  const { isDarkMode } = useTheme();
  const sliderMinTrackColor = isDarkMode ? "#FAFAF9" : "#3C3A39";
  const sliderMaxTrackColor = isDarkMode ? "#000000" : "#D2D1D1";

  return (
    <>
      <View
        className={`flex-row justify-between items-center mt-8 p-2 ${
          isLoaded ? "" : "opacity-50"
        }`}>
        <TouchableOpacity disabled={!isLoaded} onPress={() => prevTrack()}>
          <Svg width="25" height="25" viewBox="0 0 15 15" fill="none">
            <Path
              d={prevButton}
              fill={isDarkMode ? "white" : "black"}
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </Svg>
        </TouchableOpacity>
        {isPlaying ? (
          <TouchableOpacity disabled={!isLoaded} onPress={() => pause()}>
            <Svg width="25" height="25" viewBox="0 0 15 15" fill="none">
              <Path
                d={pauseButton}
                fill={isDarkMode ? "white" : "black"}
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </Svg>{" "}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity disabled={!isLoaded} onPress={() => play()}>
            <Svg width="25" height="25" viewBox="0 0 15 15" fill="none">
              <Path
                d={playButton}
                fill={isDarkMode ? "white" : "black"}
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </Svg>
          </TouchableOpacity>
        )}

        <TouchableOpacity disabled={!isLoaded} onPress={() => nextTrack()}>
          <Svg width="25" height="25" viewBox="0 0 15 15" fill="none">
            <Path
              d={nextButton}
              fill={isDarkMode ? "white" : "black"}
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </Svg>
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

export default MusicControls;
