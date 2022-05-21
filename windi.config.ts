import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
  darkMode: "media",
  theme: {
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      normal: "100%",
      hover: "110%"
    },
    extend: {
      width: {
        col: "calc(50% - 4.25rem)"
      }
    }
  },
  plugins: [require("windicss/plugin/aspect-ratio")]
});
