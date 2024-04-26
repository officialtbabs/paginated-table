/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      transitionDuration: {
        50: "50ms",
      },
    },
  },
  plugins: [],
};
