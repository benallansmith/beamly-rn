import React from "react";
import Home from "@screens/Home";
import { ThemeProvider } from "@contexts/ThemeContext";
import { PlayerProvider } from "@contexts/PlayerContext";

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <PlayerProvider>
        <Home />
      </PlayerProvider>
    </ThemeProvider>
  );
}

export default App;
