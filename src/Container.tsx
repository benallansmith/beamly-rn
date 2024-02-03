import React from "react";
import { PaperProvider } from "react-native-paper";
import Home from "@screens/Home";
import { ThemeProvider } from "@contexts/ThemeContext";
import { PlayerProvider } from "@contexts/PlayerContext";

function Container(): React.JSX.Element {
  return (
    <ThemeProvider>
      <PlayerProvider>
        <PaperProvider>
          <Home />
        </PaperProvider>
      </PlayerProvider>
    </ThemeProvider>
  );
}

export default Container;
