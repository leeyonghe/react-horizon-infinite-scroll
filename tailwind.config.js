/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./example/**/*.{js,jsx,ts,tsx}",
    "../../components/**/*.{js,jsx,ts,tsx}",
    "../../app/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [require('../../tailwind.config.js')]
} 