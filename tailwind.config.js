/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0B2239',
          navyLight: '#133454',
          gold: '#D89F26',
          goldHover: '#B98519',
          goldLight: '#FDF6E7',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Cairo"', 'sans-serif'],
        arabic: ['"Cairo"', '"Plus Jakarta Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
