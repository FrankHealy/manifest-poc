import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          600: "#2563eb",
          700: "#1d4ed8"
        }
      }
    }
  }
});
