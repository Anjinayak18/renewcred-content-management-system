import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A"
        },

        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        info: "#06B6D4",

        background: "#F8FAFC",
        surface: "#FFFFFF",

        border: "#E2E8F0",

        text: {
          primary: "#0F172A",
          secondary: "#475569",
          muted: "#94A3B8"
        }
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
        card: "0 4px 12px rgba(0,0,0,0.08)",
        dropdown: "0 10px 30px rgba(0,0,0,0.12)"
      },

      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem"
      },

      screens: {
        xs: "480px"
      },

      animation: {
        fade: "fade 0.25s ease-in-out",
        slideUp: "slideUp 0.3s ease"
      },

      keyframes: {
        fade: {
          from: {
            opacity: "0"
          },
          to: {
            opacity: "1"
          }
        },

        slideUp: {
          from: {
            opacity: "0",
            transform: "translateY(10px)"
          },
          to: {
            opacity: "1",
            transform: "translateY(0)"
          }
        }
      }
    }
  },

  plugins: []
};

export default config;