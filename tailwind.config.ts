import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        dark: {
          bg: "#0f0f0f",
          surface: "#1a1a1a",
          border: "#2a2a2a",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
