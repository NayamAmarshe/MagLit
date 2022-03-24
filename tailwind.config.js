const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /bg-|shadow-|opacity-/,
      variants: ["hover"],
    },
  ],
  theme: {
    extend: {
      screens: {
        xs: "345px",
      },
    },
  },
  plugins: [],
};
