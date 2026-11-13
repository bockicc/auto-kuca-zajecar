import { Monitor, Moon, Sun } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

import { useTheme } from "./theme-provider";

const themeLabels = {
  light: "svetla",
  dark: "tamna",
  system: "sistemska",
} as const;

const nextLabels = {
  light: "tamnu",
  dark: "sistemsku",
  system: "svetlu",
} as const;

export function DarkModeToggle() {
  const { theme, cycleTheme } = useTheme();
  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;

  return (
    <IconButton
      label={`Tema je ${themeLabels[theme]}. Prebaci na ${nextLabels[theme]}.`}
      onClick={cycleTheme}
    >
      <Icon aria-hidden="true" />
      <VisuallyHidden>Promeni temu</VisuallyHidden>
    </IconButton>
  );
}
