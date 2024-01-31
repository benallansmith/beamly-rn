import React, { createContext, useContext, useState } from "react";

// Create a context for the genre selection
const PlayerContext = createContext<{
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
}>({
  selectedGenre: "Lo-Fi",
  setSelectedGenre: () => {}
});

// Provider component
export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedGenre, setSelectedGenre] = useState<string>("Lo-Fi");

  return (
    <PlayerContext.Provider value={{ selectedGenre, setSelectedGenre }}>
      {children}
    </PlayerContext.Provider>
  );
};

// Custom hook to use the genre context
export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
