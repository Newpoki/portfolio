/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
        left: "left",
      },
      borderWidth: {
        1: 1,
      },
      lineHeight: {
        "extra-tight": 0.9,
      },
      keyframes: {
        "slide-up": {
          "0%": {
            transform: "translateY(100%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        "slightly-slide-up": {
          "0%": {
            transform: "translateY(10%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        opacity: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("./tailwind-plugins/animation-delay"),
  ],
};
