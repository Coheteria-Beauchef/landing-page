import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://coheteriabeauchef.ing.uchile.cl",
  base: "/",
  output: "static",
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["gsap", "gsap/ScrollTrigger", "gsap/MotionPathPlugin"],
    },
  },
});
