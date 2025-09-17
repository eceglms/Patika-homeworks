/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: { center: true, screens: { "2xl": "1400px" } },
    },
  },
  plugins: [],
};
 