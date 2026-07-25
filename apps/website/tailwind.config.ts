import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],

  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#0F172A",
        accent: "#F59E0B",

        success: "#16A34A",
        warning: "#F59E0B",
        danger: "#DC2626",

        border: "#E5E7EB",

        background: "#F8FAFC",
        foreground: "#0F172A",

        muted: "#64748B",

        card: "#FFFFFF"
      },

      fontFamily: {
        sans: [
          "Inter",
          "sans-serif"
        ]
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem"
      },

      boxShadow: {
        card:
          "0 8px 30px rgba(0,0,0,0.08)"
      },

      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem"
      },

      maxWidth: {
        container: "1280px"
      },

      transitionDuration: {
        400: "400ms"
      }
    }
  },

  plugins: []
};

export default config;