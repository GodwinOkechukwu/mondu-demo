import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    "html, body": {
      bg: "#0A0B0F",
      color: "white",
      overflowX: "hidden",
    },
    "*": {
      boxSizing: "border-box",
    },
  },
  theme: {
    tokens: {
      colors: {
        brand: {
          purple: { value: "#AD6AFC" },
          blue: { value: "#3A2DFF" },
        },
      },
      fonts: {
        heading: { value: `'Roboto', sans-serif` },
        body: { value: `'Roboto', sans-serif` },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);