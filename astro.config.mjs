import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://coheteriabeauchef.github.io",
  base: "/landing-page/",
  output: "static",
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["gsap", "gsap/ScrollTrigger", "gsap/MotionPathPlugin"],
    },
  },
});
