import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://coheteria-beauchef.github.io",
  base: "/landing-page/",
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
});
