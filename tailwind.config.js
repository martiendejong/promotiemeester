/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'crown-yellow': '#FFD700',
        'brand-yellow': '#FDB913',
      },
    },
  },
  plugins: [],
}
