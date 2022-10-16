/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/interface/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/sections/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "screen-xl": "86rem",
      },
      maxHeight: {
        128: "36rem",
      },
      translate: {
        5: "6rem",
      },
      gridTemplateColumns: {
        input: "auto 1fr auto",
      },
      height: {
        hero: "calc(100vh - 8rem)",
        divider: "1px",
      },
      width: {
        "auth-banner": "40rem",
        "auth-form": "calc(100% - 40rem)",
        divider: "1px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        green: {
          100: "var(--green-100)",
          200: "var(--green-200)",
        },
        orange: {
          100: "var(--orange-100)",
          200: "var(--orange-200)",
        },
        lightblue: {
          100: "var(--lightblue-100)",
          200: "var(--lightblue-200)",
        },
        blue: {
          100: "var(--blue-100)",
          200: "var(--blue-200)",
        },
        light: {
          100: "var(--light-100)",
          200: "var(--light-200)",
          300: "var(--light-300)",
          400: "var(--light-400)",
          navbar: "var(--light-navbar)",
        },
        dark: {
          100: "var(--dark-100)",
          200: "var(--dark-200)",
          300: "var(--dark-300)",
          navbar: "var(--dark-navbar)",
        },
        white: "var(--white)",
        black: "var(--black)",
        transparent: "var(--transparent)",
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
  important: true,
};
