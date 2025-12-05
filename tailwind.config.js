/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F4EFE7",
        vitality: "#DCEAD9",
        balance: "#EAD2B2",
        flow: "#E7C2C9",
        clarity: "#EDE3C2",
        serenity: "#D1DDEF",
        purity: "#E5DAF2",
        ink: "#1E1B19",
        gold: "#C7A052",
      },
      fontFamily: {
        oldstandard: ["'Old Standard TT'", "serif"],
      },
    },
  },
  plugins: [],
};
