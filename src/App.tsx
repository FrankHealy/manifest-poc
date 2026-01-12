import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "./theme";
import { RenderManifest } from "./renderManifest";
import manifest from "./page.manifest.json";

export default function App() {
  return (
    <ChakraProvider value={system}>
      <RenderManifest manifest={manifest as any} />
    </ChakraProvider>
  );
}
