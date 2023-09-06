/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      gap: {
        11: "3.5rem",
      },
      maxWidth: {
        desktop: "1820px",
      },
      padding: {
        "5px": "5px",
        "10px": "7px",
        "8px": "8px",
        "16px": "16px",
        5: "5%",
      },
      margin: {
        0: "0%",
        1: "1%",
        3: "3%",
        5: "5%",
        8: "8%",
        10: "10%",
        12.5: "12.5%",
        20: "20%",
        25: "25%",
        50: "50%"
      },
    },
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        "purple-dark": {
          // this is a theme from nextUI with my own spin on the custom colors
          colors: {
            background: "#0D001A",
            foreground: "#ffffff",
            primary: {
              50: "#EBE0FF",
              100: "#ECDAFE",
              200: "#DAC7FF",
              300: "#C7ADFF",
              400: "#AC8BEE",
              500: "#916DD5",
              600: "#7151A9",
              700: "#573D7F",
              800: "#46325D",
              900: "#3F3649",
              DEFAULT: "#916DD5",
              foreground: "#ffffff",
            },
            secondary: {
              50: "#F2F168",
            },
            focus: "#F182F6",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
              "3xl": "24px"
            },
            borderWidth: {
              none: "0",
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
      },
    }),
  ],
};
