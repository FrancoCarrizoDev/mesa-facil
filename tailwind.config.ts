import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      "blue-chill": {
        "50": "#f2f9f9",
        "100": "#ddeff0",
        "200": "#bfe0e2",
        "300": "#92cace",
        "400": "#5faab1",
        "500": "#438e96",
        "600": "#3b757f",
        "700": "#356169",
        "800": "#325158",
        "900": "#2d464c",
        "950": "#1a2c32",
      },
      white: "#fff",
      black: "#000",
      transparent: "transparent",
      gray: {
        "50": "#f9fafb",
        "100": "#f4f5f7",
        "200": "#e5e7eb",
        "300": "#d2d6dc",
        "400": "#9fa6b2",
        "500": "#6b7280",
        "600": "#4b5563",
        "700": "#374151",
        "800": "#252f3f",
        "900": "#161e2e",
      },
    },
  },
  plugins: [],
};
export default config;
