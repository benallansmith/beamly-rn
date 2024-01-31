import React, { useEffect, useState } from "react";
import ModeButton from "../ModeButton";

export function ModeToggle() {
  const [mounted, setMounted] = useState(false);
  // const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    console.log("mounted");
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <ModeButton type={"light"} onClick={() => console.log("Mode button clicked")} />;
}
